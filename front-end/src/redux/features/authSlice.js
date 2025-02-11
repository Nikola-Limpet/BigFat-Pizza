import { createSlice } from '@reduxjs/toolkit';
import { getAccessToken, clearTokens } from '@/utils/tokenManager';
import {
  clearUserCart,
  loadCartFromStorage,
  saveCartToStorage,
} from '@/utils/cartStorage';

const initialState = {
  user: null,
  isAuthenticated: !!getAccessToken(),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      try {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;

        // Merge guest cart with user cart if exists
        const guestCart = loadCartFromStorage();
        const userCart = loadCartFromStorage(action.payload.id);

        if (guestCart.items.length > 0 || guestCart.savedItems.length > 0) {
          const mergedCart = {
            items: [...userCart.items, ...guestCart.items],
            savedItems: [...userCart.savedItems, ...guestCart.savedItems],
          };
          saveCartToStorage(mergedCart, action.payload.id);
          clearUserCart(); // Clear guest cart
        }
      } catch (error) {
        console.error('Error during login:', error);
        state.error = 'Failed to setup user session';
      }
    },
    clearTokenOfState: (state) => {
      try {
        clearUserCart(state.user?.id);
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        clearTokens();
      } catch (error) {
        console.error('Error during logout:', error);
        state.error = 'Failed to clear user session';
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setCredentials, clearTokenOfState, setError, clearError } =
  authSlice.actions;
export default authSlice.reducer;
