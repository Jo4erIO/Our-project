export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

export const setAuthUser = (user: object) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getAuthUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const removeAuthUser = () => {
  localStorage.removeItem('user');
};

export const clearAuthData = () => {
  removeAuthToken();
  removeAuthUser();
};

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};