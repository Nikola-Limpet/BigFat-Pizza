import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Products', 'Orders', 'User'],
  endpoints: (builder) => ({
    // Products
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['Products'],
    }),
    getProduct: builder.query({
      query: (slug) => `/products/${slug}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    // Orders
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Orders'],
    }),
    getOrders: builder.query({
      query: () => '/orders',
      providesTags: ['Orders'],
    }),
    // User Profile
    getUserProfile: builder.query({
      query: () => '/user/profile',
      providesTags: ['User'],
    }),
    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: '/user/profile',
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = api;
