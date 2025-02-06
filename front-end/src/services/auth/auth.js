import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthHeader = (token) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const resetAuthHeader = () => {
  delete apiClient.defaults.headers.common['Authorization'];
};

export const authService = {
  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const { token, user } = response.data;
      setAuthHeader(token);
      localStorage.setIem('toekn', token);
      return { token, user };
    } catch (error) {
      throw error;
    }
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

export default authService;
