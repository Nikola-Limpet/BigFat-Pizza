import { createSlice } from '@reduxjs/toolkit';
import { getAccessToken, clearTokens } from '@/utils/tokenManager';
import { clearUserCart } from '@/utils/cartStorage';

const initialState = {
  user: null,
  isAuthenticated: !!getAccessToken(),
  isLoading: false,
  isAdmin: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      try {
        const { user, accessToken, refreshToken } = action.payload;
        state.user = user;
        state.isAuthenticated = true;
        state.isAdmin = user?.isAdmin || false;
        state.error = null;
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
        state.isAdmin = false;
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
