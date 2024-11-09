import { createSlice } from "@reduxjs/toolkit";

const initialState = { Authenticator: false };

const AuthSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    LogIn(state) {
      state.Authenticator = true;
    },
    LogOut(state) {
      state.Authenticator = false;
    },
  },
});

export const AuthAction = AuthSlice.actions;

export default AuthSlice.reducer;
