import axios from 'axios';
import { getToken } from '../utils/tokenManager';

const baseUrl = '/api/user';

const getProfile = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getToken()}` },
  };
  const response = await axios.get(`${baseUrl}/profile`, config);
  return response.data;
};

const getUserOrders = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getToken()}` },
  };
  const response = await axios.get(`${baseUrl}/orders`, config);
  return response.data;
};

const getUserAddresses = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getToken()}` },
  };
  const response = await axios.get(`${baseUrl}/addresses`, config);
  return response.data;
};

export default { getProfile, getUserOrders, getUserAddresses };
