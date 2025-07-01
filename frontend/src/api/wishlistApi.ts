import axios from 'axios';
import type { WishlistItem } from '@/types/Product';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const WishlistApi = {
  getWishlist: (userId: string) => 
    axios.get<{ products: WishlistItem[] }>(`/api/wishlist/${userId}`),

  addToWishlist: (userId: string, productId: string) =>
    axios.post('/api/wishlist', { userId, productId }),

  removeFromWishlist: (userId: string, productId: string) =>
    axios.delete('/api/wishlist', { data: { userId, productId } })
};