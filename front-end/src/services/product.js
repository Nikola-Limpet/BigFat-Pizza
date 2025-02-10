import axios from 'axios';
import axiosInstance from '../utils/axios';
const baseURL = '/products';

const getAllCategories = async () => {
  const response = await axiosInstance.get(`${baseURL}/categories`);
  return response.data;
};

const getAllProducts = async () => {
  const response = await axiosInstance.get(baseURL);
  return response.data;
};

const getProductsByCategory = async (categorySlug) => {
  const response = await axiosInstance.get(
    `${baseURL}/category/${categorySlug}`
  );
  return response.data;
};

const getProductBySlug = async (slug) => {
  const response = await axiosInstance.get(`${baseURL}/${slug}`);
  return response.data;
};

export default {
  getAllCategories,
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
};
