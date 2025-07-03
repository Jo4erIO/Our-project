import axios from 'axios';
import type { WishlistItem } from '@/types/Product';

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.withCredentials = true;
  
  return config;
});

export const WishlistApi = {
  getWishlist: () => 
    axios.get<{ products: any[] }>('/api/wishlist'),
  
  addToWishlist: (productId: string) =>
    axios.post('/api/wishlist', { productId }),

  removeFromWishlist: (productId: string) =>
    // Исправлено: передача productId в URL
    axios.delete(`/api/wishlist/${productId}`)
};