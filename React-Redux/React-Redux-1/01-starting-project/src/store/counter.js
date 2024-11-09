import { createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 9, show: true };

const CounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter++;
    },
    decrement: (state) => {
      state.counter--;
    },
    increase: (state, action) => {
      state.counter = state.counter + action.payload;
    },
    toggle: (state) => {
      state.show = !state.show;
    },
  },
});

export const CounterAction = CounterSlice.actions;

export default CounterSlice.reducer;
