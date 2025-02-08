import axios from 'axios';
const baseURL = '/api/products';

const getAllCategories = async () => {
  const response = await axios.get(`${baseURL}/categories`);
  return response.data;
};

const getAllProducts = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const getProductGroupedByCategory = async (slug) => {
  const response = await axios.get(`${baseURL}/${slug}`);
  return response.data;
};

const getProductBySlug = async (slug) => {
  try {
    // Add category as a query parameter since it's in your API URL
    const response = await axios.get(`${baseURL}/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error); // Debug log
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
};

export default {
  getAllCategories,
  getAllProducts,
  getProductBySlug,
  getProductGroupedByCategory,
};
