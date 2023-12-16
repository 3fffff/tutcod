#include <atomic>

template <typename T> struct node {
    node(const T& value_, node* previous_ = nullptr)
        : value { value_ }
        , previous { previous_ } {};

    T value;
    node* previous;
};

template <typename T> class lock_free_stack {
public:
    lock_free_stack() = default;

    void push(const T& val) {
        auto new_node = new node<T>(std::move(val));
        bool success = false;

        while (!success) {
            auto current_top = m_top.load();
            new_node->previous = current_top;
            success = m_top.compare_exchange_strong(current_top, new_node);
        };
        ++m_size;
    };

    T pop() {
        bool success = false;
        node<T>* current_top;
        while (!success) {
            current_top = m_top.load();
            if (!current_top)
                return 0;

            auto new_top = current_top->previous;
            success = m_top.compare_exchange_strong(current_top, new_top);
        }
        --m_size;
        auto res = current_top->value;
        delete current_top;
        return res;
    };

    std::size_t size() { return m_size.load(); }
    void print() {
        auto tmp = m_top.load();
        while (tmp) {
            std::cout << tmp->value << " ";
            tmp = tmp->previous;
        }
    }

private:
    std::atomic_size_t m_size { 0 };
    std::atomic<node<T>*> m_top;
};
