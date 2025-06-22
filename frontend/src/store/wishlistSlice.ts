import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types/Product';

interface WishlistState {
  items: Product[];
}

// Функция для загрузки состояния из localStorage
const loadWishlistFromStorage = (): Product[] => {
  try {
    const savedWishlist = localStorage.getItem('techshop_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (error) {
    console.error('Ошибка загрузки избранного:', error);
    return [];
  }
};

const initialState: WishlistState = {
  items: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      if (!state.items.some(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
        localStorage.setItem('techshop_wishlist', JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('techshop_wishlist', JSON.stringify(state.items));
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;