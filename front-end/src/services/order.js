import axiosInstance from '../utils/axios';

const baseURL = '/orders';
export const orderService = {
  createOrder: async (orderData) => {
    const response = await axiosInstance.post(baseURL, orderData);
    return response.data;
  },

  getOrderById: async (orderId) => {
    const response = await axiosInstance.get(`${baseURL}/${orderId}`);
    return response.data;
  },

  trackOrder: async (orderId) => {
    const response = await axiosInstance.get(`${baseURL}/track/${orderId}`);
    return response.data;
  },

  getUserOrders: async () => {
    const response = await axiosInstance.get(`${baseURL}/user`);
    return response.data;
  },
};
