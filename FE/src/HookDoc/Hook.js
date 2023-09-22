/*
1, useState:
useState là một hook cho phép bạn tạo và quản lý state cho
function component. useState trả về một mảng gồm hai phần tử:
+)state là giá trị hiện tại của state
+)setState là hàm để cập nhật state
    const [count, setCount] = useState(0);

    return (
      <div>
        <button onClick={() => setCount(count + 1)}>
          Tăng số đếm
        </button>
        <p>Số đếm: {count}</p>
      </div>
    );

2, useEffect:
useEffect là một hook cho phép bạn thực thi logic khi
component được render hoặc thay đổi. useEffect chấp nhận
một hàm callback làm tham số. Hàm callback này sẽ được gọi
khi component được render lần đầu tiên và sau đó bất cứ khi
nào state hoặc props của component thay đổi.
       function App() {
      const [count, setCount] = useState(0);

      useEffect(() => {
        // Thực thi logic khi component được render lần đầu tiên
        // và bất cứ khi nào state hoặc props của component thay đổi
        setInterval(() => {
          setCount(count + 1);
        }, 1000);
      }, []);

      return (
        <div>
          <button onClick={() => setCount(count + 1)}>
            Tăng số đếm
          </button>
          <p>Số đếm: {count}</p>
        </div>
      );
    }

3, useContext:
useContext là một hook cho phép bạn truy cập context từ
function component. Context là một cách để chia sẻ dữ
liệu giữa các component.
    const ThemeContext = createContext();

    function App() {
      const [theme, setTheme] = useState("light");

      return (
        <ThemeContext.Provider value={theme}>
          <MyComponent />
        </ThemeContext.Provider>
      );
    }

    function MyComponent() {
      const { theme } = useContext(ThemeContext);

      return (
        <div>
          <p>Chủ đề hiện tại là: {theme}</p>
          <button onClick={() => setTheme("dark")}>
            Thay đổi chủ đề thành tối
          </button>
        </div>
      );
    }

4, useReducer:
useReducer là một hook cho phép bạn quản lý state phức tạp bằng
reducer. Reducer là một hàm được sử dụng để cập nhật state.
    const reducer = (state, action) => {
      switch (action.type) {
        case "INCREMENT":
          return {
            ...state,
            count: state.count + 1,
          };
        case "DECREMENT":
          return {
            ...state,
            count: state.count - 1,
          };
        default:
          throw new Error("Action type not found");
      }
    };

    function App() {
      const [state, dispatch] = useReducer(reducer, { count: 0 });

      return (
        <div>
          <button onClick={() => dispatch({ type: "INCREMENT" })}>
            Tăng số đếm
          </button>
          <button onClick={() => dispatch({ type: "DECREMENT" })}>
            Giảm số đếm
          </button>
          <p>Số đếm: {state.count}</p>
        </div>
      );
    }

5, useCallback:
useCallback là một hook cho phép bạn tạo một hàm callback
không bị thay đổi bởi state hoặc props của component.
Điều này có thể giúp cải thiện hiệu suất của component.
    function App() {
      const [count, setCount] = useState(0);

      const increment = useCallback(() => setCount(count + 1), []);

      return (
        <div>
          <button onClick={increment}>
            Tăng số đếm
          </button>
          <p>Số đếm: {count}</p>
        </div>
      );
    }
6, useMemo:
useMemo là một hook cho phép bạn tạo một giá trị được
tính toán một lần. Điều này có thể giúp cải thiện hiệu
suất của component.
    function App() {
      const [count, setCount] = useState(0);

      const expensiveFunction = () => {
        // Hàm này thực hiện một số tính toán tốn thời gian
        return 100 * count;
      };

      const memoizedValue = useMemo(() => expensiveFunction(), [count]);

      return (
        <div>
          <p>Giá trị được tính toán: {memoizedValue}</p>
        </div>
      );
    }
7, useRef:
useRef là một hook cho phép bạn lưu trữ một giá trị trong
component. Giá trị được lưu trữ bởi useRef có thể là bất kỳ
thứ gì, bao gồm một đối tượng, một số hoặc một hàm.
       function App() {
      const inputRef = useRef();

      const focusInput = () => {
        inputRef.current.focus();
      };

      return (
        <div>
          <input ref={inputRef} />
          <button onClick={focusInput}>
            Lấy tiêu điểm của ô nhập liệu
          </button>
        </div>
      );
    }
8, useImperativeHandle:
useImperativeHandle là một hook cho phép bạn tạo một handle
cho một ref. Handle là một cách để truy cập giá trị được lưu
trữ bởi một ref.
       function App() {
      const inputRef = useRef();

      useImperativeHandle(inputRef, () => ({
        focus: () => {
          inputRef.current.focus();
        },
      }));

      return (
        <div>
          <input ref={inputRef} />
        </div>
      );
    }
9, useLayoutEffect:
useLayoutEffect là một hook tương tự như useEffect,
nhưng nó sẽ được gọi khi component được render và bố cục
thay đổi.
       function App() {
      const [count, setCount] = useState(0);

      useLayoutEffect(() => {
        // Thực thi logic khi component được render và bố cục thay đổi
        document.title = `Số đếm: ${count}`;
      }, [count]);

      return (
        <div>
          <p>Số đếm: {count}</p>
          <button onClick={() => setCount(count + 1)}>
            Tăng số đếm
          </button>
        </div>
      );
    }
10, useDebugValue:
useDebugValue là một hook cho phép bạn hiển thị giá trị của
state hoặc props trong component. Điều này có thể giúp bạn
debug component.
    function App() {
      const [count, setCount] = useState(0);

      useDebugValue(count, "Số đếm");

      return (
        <div>
          <p>Số đếm: {count}</p>
          <button onClick={() => setCount(count + 1)}>
            Tăng số đếm
          </button>
        </div>
      );
    }
 */
