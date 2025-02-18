import axios from 'axios';
import { getAccessToken } from '../utils/tokenManager';

const baseUrl = '/user';

const getProfile = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  };
  const response = await axios.get(`${baseUrl}/profile`, config);
  return response.data;
};

const getUserOrders = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  };
  const response = await axios.get(`${baseUrl}/orders`, config);
  return response.data;
};

const getUserAddresses = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  };
  const response = await axios.get(`${baseUrl}/addresses`, config);
  return response.data;
};

export default { getProfile, getUserOrders, getUserAddresses };
