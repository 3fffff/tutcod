class Peterson
{
    private bool[] flagOfActiveThreads = new bool[2];
    private volatile int AcquiredThread = 0;
    private volatile int IncVar = 0;

    public int getIncVar(){
        return IncVar;
    }

    private void Lock(int threadID)
    {
        Thread.MemoryBarrier();
        flagOfActiveThreads[threadID] = true;
        int otherThread = 1 - threadID;
        AcquiredThread = threadID;
        while (flagOfActiveThreads[otherThread] && AcquiredThread == threadID)
        {

        }
    }

    private void Unlock(int threadID)
    {
        flagOfActiveThreads[threadID] = false;
    }

    public void Inc()
    {
        Lock(0);
        for (int i = 0; i < 100; i++)
            IncVar++;
        Unlock(0);
    }

    public void Dec()
    {
        Lock(1);
        for (int i = 0; i < 500; i++)
            IncVar--;
        Unlock(1);
    }
}

class Program
{

    public static void Main()
    {
        Peterson p = new Peterson();
        Thread threadInc = new Thread(new ThreadStart(p.Inc));
        Thread threadDec = new Thread(new ThreadStart(p.Dec));
        threadInc.Start();
        threadDec.Start();
        Thread.Sleep(1000);
        Console.WriteLine(p.getIncVar());
    }
}
