import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Rehydrate cart from localStorage on store initialization
const savedCart = localStorage.getItem('cart');
if (savedCart) {
  try {
    const parsedCart = JSON.parse(savedCart);
    store.dispatch({ type: 'cart/rehydrate', payload: parsedCart });
  } catch (error) {
    console.error('Error loading cart:', error);
  }
}
