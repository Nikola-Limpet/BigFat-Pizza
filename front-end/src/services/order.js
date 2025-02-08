import axios from 'axios';
import { getToken } from '../utils/tokenManager';

const baseURL = '/api/orders';

const useCreateOrder = async (order) => {
  return useMutation(async () => {
    const config = {
      headers: { Authorization: `Bearer ${getToken()}` },
    };
    const response = await axios.post(baseURL, order, config);
    return response.data;
  });
};

const useGetOrderById = async (orderId) => {
  return useQuery(['order', orderId], async () => {
    const config = {
      headers: { Authorization: `Bearer ${getToken()}` },
    };
    const response = await axios.get(`${baseURL}/${orderId}`, config);
    return response.data;
  });
};

const useTrackOrder = async (orderId) => {
  return useQuery(['order', orderId], async () => {
    const config = {
      headers: { Authorization: `Bearer ${getToken()}` },
    };
    const response = await axios.get(`${baseURL}/track/${orderId}`, config);
    return response.data;
  });
};
export default { useCreateOrder, useGetOrderById, useTrackOrder };
