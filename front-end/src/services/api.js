import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const fetchPizzas = async () => {
  const response = await api.get('/pizzas');
  return response.data;
};
