const redux = require("redux");

const CounterReducer = (state = { counter: 9 }, action) => {
  if (action.type === "increase") {
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === "decrease") {
    return {
      counter: state.counter - 1,
    };
  }
  return state;
};

const store = redux.createStore(CounterReducer);

const CounterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

store.subscribe(CounterSubscriber);

store.dispatch({ type: "increase" });
store.dispatch({ type: "decrease" });
