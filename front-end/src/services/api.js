import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import axios from 'axios';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Products', 'Orders', 'User', 'Categories'],
  endpoints: (builder) => ({
    // Products
    getProducts: builder.query({
      query: () => '/products/',
      providesTags: ['Products'],
    }),
    getProduct: builder.query({
      query: (slug) => `/products/${slug}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    getCategories: builder.query({
      query: () => '/products/categories',
      providesTags: ['Categories'],
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
  useGetCategoriesQuery,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = api;

// const basseURL = 'http://localhost:8080/api';

// // let token = null;

// // const setToken = (newtToken) => {
// //   token = `Bearer ${newtToken}`;
// // };

// export const getAllCategories = async () => {
//   const res = await axios.get(`${basseURL}/products/categories`);
//   const data = res.data;
//   return data;
// };
