import { createSlice } from '@reduxjs/toolkit';

export const loginStatusSlice = createSlice({
  name: 'loginStatus',
  initialState: {
    loggedIn: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = loginStatusSlice.actions;

export default loginStatusSlice.reducer;
