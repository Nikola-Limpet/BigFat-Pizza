import axios from 'axios';
const baseURL = 'api/products';

const getAllCategories = async () => {
  const response = await axios.get(`${baseURL}/categories`);
  return response.data;
};

const getAllProducts = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const getProductById = async (slug) => {
  const response = await axios.get(`${baseURL}/${slug}`);
  return response.data;
};

export default { getAllCategories, getAllProducts, getProductById };
