// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getToken, clearToken } from '@/utils/tokenManager';

const initialState = {
  user: null,
  isAuthenticated: !!getToken(),
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
      clearToken();
    },
  },
});

export const { setCredentials, clearTokenOfState } = authSlice.actions;
export default authSlice.reducer;
