import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// helper function that explicit token
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set auth header for authenticated requests
export const setAuthHeader = (token) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Remove auth header
export const resetAuthHeader = () => {
  delete apiClient.defaults.headers.common['Authorization'];
};

export const authService = {
  async login(credentials) {
    const response = await apiClient.post('/auth/login', credentials);
    setAuthHeader(response.data.token);
    return response.data;
  },

  async register(userData) {
    const response = await apiClient.post('/auth/register', userData);
    setAuthHeader(response.data.token);
    return response.data;
  },

  async logout() {
    resetAuthHeader();
    localStorage.removeItem('token');
  },

  async refreshToken() {
    const response = await apiClient.post('/auth/refresh-token');
    setAuthHeader(response.data.token);
    return response.data;
  },
};

// Initialize auth header if token exists
const storedToken = localStorage.getItem('token');
if (storedToken) {
  setAuthHeader(storedToken);
}
