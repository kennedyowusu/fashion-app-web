import { configureStore } from '@reduxjs/toolkit'
import login from './slices/authentication/login'
import register from './slices/authentication/register'


const store = configureStore({
  reducer: {
    login,
    register,
  },
});

export default store;