import axios from 'axios';
import { setToken } from '../utils/tokenManager';

const baseURL = 'http://localhost:8080/api';

const login = async (credentials) => {
  const response = await axios.post(`${baseURL}/auth/login`, credentials);
  setToken(response.data.token);
  return response.data;
};

const register = async (credentials) => {
  const response = await axios.post(`${baseURL}/auth/register`, credentials);
  setToken(response.data.token);
  return response.data;
};

export default { login, register };
