import { createSlice } from '@reduxjs/toolkit';

export const loginStatusSlice = createSlice({
  name: 'loginStatus',
  initialState: {
    loggedIn: false,
    user: null,
    isAdmin: false,
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
      state.isAdmin = false;
    },
  },
});

export const { login, logout } = loginStatusSlice.actions;

export default loginStatusSlice.reducer;
