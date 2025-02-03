import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000,
});

export const fetchMenu = async () => {
  try {
    const response = await api.get('/pizzas');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
