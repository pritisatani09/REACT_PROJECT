// import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isCreated: false,
  errorMSG: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.errorMSG = null;
      state.isCreated = false;
    },
    logout: (state) => {
      state.user = null;
    },
    signupSuccess: (state, action) => {
      state.isCreated = true;
      state.errorMSG = null;
    },
    authError: (state, action) => {
      state.errorMSG = action.payload;
    }
  }
});

export const { login, logout, signupSuccess, authError } = authSlice.actions;
export default authSlice.reducer;
