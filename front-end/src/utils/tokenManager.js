let token = null;

export const setToken = (newToken) => {
  token = newToken;
  localStorage.setItem('token', newToken);
};

export const getToken = () => {
  if (!token) {
    token = localStorage.getItem('token');
  }
  return token;
};

export const clearToken = () => {
  token = null;
  localStorage.removeItem('token');
};
