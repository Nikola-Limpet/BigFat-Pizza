// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getAccessToken, clearTokens } from '@/utils/tokenManager';

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
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearTokenOfState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      clearTokens();
    },
  },
});

export const { setCredentials, clearTokenOfState } = authSlice.actions;
export default authSlice.reducer;
