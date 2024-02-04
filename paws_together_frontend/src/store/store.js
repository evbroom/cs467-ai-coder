import { configureStore } from '@reduxjs/toolkit';
import loginStatusReducer from '../slices/loginStatusSlice';

export default configureStore({
  reducer: {
    loginStatus: loginStatusReducer,
  },
});
