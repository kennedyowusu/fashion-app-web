import { configureStore } from '@reduxjs/toolkit'
import login from './slices/authentication/login'


const store = configureStore({
 reducer: {
   login,
 },
});

export default store;