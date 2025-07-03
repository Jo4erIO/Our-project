// src/api/cartApi.ts
import axios from 'axios';
import { CartItem } from '../store/cartSlice';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.withCredentials = true;
  return config;
});

export const CartApi = {
  getCart: (userId: string) => 
    axios.get<{ items: CartItem[] }>(`/api/cart/${userId}`),

  addItem: (userId: string, item: { productId: string; quantity: number }) =>
    axios.post('/api/cart', { userId, ...item }),

  removeItem: (userId: string, productId: string) =>
    axios.delete('/api/cart', { data: { userId, productId } }),

  updateQuantity: (userId: string, productId: string, quantity: number) =>
    axios.patch('/api/cart', { userId, productId, quantity }),

  syncCart: (userId: string, items: Array<{ productId: string; quantity: number }>) =>
    axios.put('/api/cart/sync', { userId, items })
};