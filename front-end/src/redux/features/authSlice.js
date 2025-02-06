import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@services/auth/auth';

// helper function for token
const tokenManager = {
  get: () => localStorage.getItem('token'),
  set: (token) => localStorage.setItem('token', token),
  clear: () => localStorage.removeItem('token'),
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // const data = await authService.login(credentials);
      const { token, user } = await authService.login(credentials);
      tokenManager.set(token);
      return { user, token };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed. Please try again.' // reduce server loading
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const { token, user } = await authService.register(userData);
      tokenManager.set(token);
      return { user, token };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Registration failed. Please try again.'
      );
    }
  }
);

const initialState = {
  user: null,
  token: tokenManager.get(),
  isLoading: false,
  error: null,
  isAuthenticated: !!tokenManager.get(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      tokenManager.clear();
      authService.logout();
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          [loginUser.pending, registerUser.pending].includes(action.type),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          [loginUser.fulfilled, registerUser.fulfilled].includes(action.type),
        (state, { payload }) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = payload.user;
          state.token = payload.token;
        }
      )
      .addMatcher(
        (action) =>
          [loginUser.rejected, registerUser.rejected].includes(action.type),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
          state.isAuthenticated = false;
        }
      );
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
