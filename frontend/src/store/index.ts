import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
