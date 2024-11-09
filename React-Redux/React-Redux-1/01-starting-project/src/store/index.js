// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./counter";
import AuthReducer from "./auth";
// const CounterReducer = (state = initialValue, action) => {
//   if (action.type === "increase") {
//     return {
//       counter: state.counter + 1,
//       show: state.show,
//     };
//   }
//   if (action.type === "decrease") {
//     return { ...state, counter: state.counter - 1 };
//   }
//   if (action.type === "incre") {
//     return { ...state, counter: state.counter + action.value };
//   }
//   if (action.type === "toggle") {
//     return {
//       ...state,
//       show: !state.show,
//     };
//   }
//   return state;
// };

// const Store = createStore(CounterReducer);

// const CounterSlice = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.counter++;
//     },
//     decrement: (state) => {
//       state.counter--;
//     },
//     increase: (state, action) => {
//       state.counter = state.counter + action.payload;
//     },
//     toggle: (state) => {
//       state.show = !state.show;
//     },
//   },
// });

const Store = configureStore({
  reducer: { counter: CounterReducer, Auth: AuthReducer },
});

export default Store;
