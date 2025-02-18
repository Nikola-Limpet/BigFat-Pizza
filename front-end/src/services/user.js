import { getAccessToken } from '../utils/tokenManager';
import axiosInstance from '../utils/axios';

const baseUrl = '/user';

const getProfile = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  };
  const response = await axiosInstance.get(`${baseUrl}/profile`, config);
  return response.data;
};

const getUserOrders = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  };
  const response = await axiosInstance.get(`${baseUrl}/orders`, config);
  return response.data;
};

const getUserAddresses = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  };
  const response = await axiosInstance.get(`${baseUrl}/addresses`, config);
  return response.data;
};

export default { getProfile, getUserOrders, getUserAddresses };
