import axiosInstance from '../utils/axios.js';
import { setTokens } from '../utils/tokenManager';

const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  const { accessToken, refreshToken } = response.data;
  setTokens({ accessToken, refreshToken });
  return response.data;
};

const register = async (credentials) => {
  const response = await axiosInstance.post('/auth/register', credentials);
  const { accessToken, refreshToken } = response.data;
  setTokens({ accessToken, refreshToken });
  return response.data;
};

const refreshToken = async (token) => {
  const response = await axiosInstance.post('/auth/refresh-token', { token });
  return response.data;
};

export default { login, register, refreshToken };
