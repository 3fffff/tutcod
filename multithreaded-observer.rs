use std::sync::{Arc, Mutex, Condvar};

struct ArcReactor<T>(Arc<(Mutex<T>, Condvar)>);
impl<T: 'static + Clone + Send> ArcReactor<T> {

    /// Creates a new `Arc<(Mutex<T>, Condvar)>` with data: T stored in the mutex.
    fn new(data: T) -> ArcReactor<T> {
        ArcReactor(Arc::new((Mutex::new(data), Condvar::new())))
    }
    /// Write to the value contained in the mutex, and notify the condvar
    fn write(&mut self, val: &T) {
        let &(ref lock, ref cvar) = &*self.0;
        let mut data = lock.lock().unwrap();
        *data = (*val).clone();
        cvar.notify_all();
    }
    /// Read from the value contained in the mutex
    fn read(&self) -> T {
        let &(ref lock, _) = &*self.0;
        let data = lock.lock().unwrap();
        data.clone()
    }
    /// Get a clone of this object. Because this object is a refference type (Arc), any
    /// modifications to the clone will be reflected in the original object.
    fn clone(&self) -> ArcReactor<T> {
        ArcReactor(self.0.clone())
    }

    /// Blocks the current thread until the condvar receives a notification
    /// Consumes no CPU time while waiting for an event to occur.
    fn wait_for_change(&self) {
        let &(ref lock, ref cvar) = &*self.0;
        let _ = cvar.wait(lock.lock().unwrap()).unwrap();
    }

    /// Starts a new thread that waits for the condvar to receive a notification,
    /// and calls the callback when it does.
    /// Consumes no CPU time while waiting for an event to occur
    /// This may miss a change if the value is changing faster than this loop can process
    fn on_changed(&self, callback: fn(T)) -> std::thread::JoinHandle<()> {
        let mirror = self.clone();
        let reader = std::thread::spawn( move || {
            loop {
                mirror.wait_for_change();
                callback(mirror.read());
            }
        });
        reader
    }
}


fn main() {
    
    let mut data = ArcReactor::new(0);
    let data_ref = data.clone();

    let observer_a = data_ref.on_changed(|val| println!("A: {}", val));
    let observer_b = data_ref.on_changed(|val| println!("B: {}", val));

    let writer = std::thread::spawn( move || {
        loop {
            let new = data.read() + 1;
            data.write(&new);
            std::thread::sleep(std::time::Duration::from_millis(100));
        }
    });

    writer.join().unwrap();
    observer_a.join().unwrap();
    observer_b.join().unwrap();
}


use std::sync::{Arc, Mutex, Condvar};

struct ArcReactor<T>(Arc<(Mutex<Option<T>>, Condvar, Condvar)>);
impl<T: 'static + Clone + Send> ArcReactor<T> {

    /// Creates a new `Arc<(Mutex<Option<T>>, Condvar)>` with data: T stored in the mutex.
    fn new(data: T) -> ArcReactor<T> {
        ArcReactor(Arc::new((Mutex::new(Option::Some(data)), Condvar::new(), Condvar::new())))
    }
    /// Write to the value contained in the mutex, and notify the condvar
    /// Waits for the observables to be notified before allowing another write.
    fn write(&mut self, val: &T) {
        let &(ref lock, ref write_cvar, _) = &*self.0;
        let mut data = lock.lock().unwrap();
        *data = Option::Some((*val).clone());
        write_cvar.notify_all();
        drop(data);
        self.wait_for_callback();
    }
    /// Read from the value contained in the mutex
    fn read(&self) -> Option<T> {
        let &(ref lock, _, _) = &*self.0;
        let data = lock.lock().unwrap();
        data.clone()
    }
    /// Get a clone of this object. Because this object is a refference type (Arc), any
    /// modifications to the clone will be reflected in the original object.
    fn clone(&self) -> ArcReactor<T> {
        ArcReactor(self.0.clone())
    }

    /// Blocks the current thread until the condvar receives a notification
    /// Consumes no CPU time while waiting for an event to occur.
    fn wait_for_change(&self) {
        let &(ref lock, ref write_cvar, _) = &*self.0;
        let _ = write_cvar.wait(lock.lock().unwrap()).unwrap();
    }

    /// Notify that the callbacks have been called, a new write is now allowed.
    fn notify_callback(&self) {
        let &( _, _, ref callback_cvar) = &*self.0;
        callback_cvar.notify_all();
    }

    fn wait_for_callback(&self) {
        let &(ref lock, _, ref callback_cvar) = &*self.0;
        let _ = callback_cvar.wait(lock.lock().unwrap()).unwrap();
    }

    /// Starts a new thread that waits for the condvar to receive a notification,
    /// and calls the callback when it does.
    /// Consumes no CPU time while waiting for an event to occur
    fn on_changed(&self, callback: fn(T)) -> std::thread::JoinHandle<()> {
        let mirror = self.clone();
        let reader = std::thread::spawn( move || {
            loop {
                mirror.wait_for_change();
                match mirror.read() {
                    Some(data) => {
                        callback(data);
                        mirror.notify_callback();
                    }
                    None => break,
                }
            }
        });
        reader
    }

    ///Writes a None value to the mutex, and notifies the condvar
    fn stop_all_observers(&mut self) {
        let &(ref lock, ref write_cvar, _) = &*self.0;
        let mut data = lock.lock().unwrap();
        *data = Option::None;
        write_cvar.notify_all();
    }

}


fn main() {
    
    let mut data = ArcReactor::new(0);
    let data_ref = data.clone();

    let observer_a = data_ref.on_changed(|val| println!("A got: {}", val));
    let observer_b = data_ref.on_changed(|val| println!("B got: {}", val));

    let writer = std::thread::spawn( move || {
        loop {
            let new = match data.read() {
                Some(val) => val + 1,
                None => break,
            };
            if new < 1000 {
                println!("writing {}", new);
                data.write(&new);
            } else {
                println!("stopping");
                data.stop_all_observers();
                break;
            }
        }
    });

    writer.join().unwrap();
    observer_a.join().unwrap();
    observer_b.join().unwrap();
    
