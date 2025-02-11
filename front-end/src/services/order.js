import axiosInstance from '../utils/axios';

const baseURL = '/api/orders';

export const createOrder = async (orderData) => {
  const response = await axiosInstance.post(baseURL, orderData);
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await axiosInstance.get(`${baseURL}/${orderId}`);
  return response.data;
};

export const trackOrder = async (orderId) => {
  const response = await axiosInstance.get(`${baseURL}/track/${orderId}`);
  return response.data;
};

export default {
  createOrder,
  getOrderById,
  trackOrder,
};
