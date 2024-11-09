import { useSelector, useDispatch } from "react-redux";
import classes from "./Counter.module.css";
import { CounterAction } from "../store/counter";

const Counter = () => {
  const toggleCounterHandler = () => {
    dispatch(CounterAction.toggle());
  };
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const showToggle = useSelector((state) => state.counter.show);
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showToggle && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={() => dispatch(CounterAction.increment())}>
          increase
        </button>
        <button onClick={() => dispatch(CounterAction.increase(10))}>
          increase by Value
        </button>
        <button onClick={() => dispatch(CounterAction.decrement())}>
          decrease
        </button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
