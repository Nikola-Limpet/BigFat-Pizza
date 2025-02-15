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
  getAllOrders: async ({
    page,
    status,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  }) => {
    const params = new URLSearchParams({
      page: page.toString(),
      ...(status && status !== 'all' && { status }),
      sortBy,
      sortOrder,
    });

    const response = await axiosInstance.get(`/admin/orders?${params}`);
    return response.data;
  },
  updateOrderStatus: async (orderId, status) => {
    const response = await axiosInstance.put(
      `/admin/orders/${orderId}/status`,
      { status } // Backend should handle status casing
    );
    return response.data;
  },

  updateTrackingNumber: async (orderId, trackingNumber) => {
    const response = await axiosInstance.put(
      `/admin/orders/${orderId}/tracking`,
      {
        trackingNumber,
      }
    );
    return response.data;
  },
  getDashboardStats: async () => {
    const response = await axiosInstance.get('/admin/stats');
    return response.data;
  },
};
