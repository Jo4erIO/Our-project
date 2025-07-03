import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { WishlistApi } from '@/api/wishlistApi';
import type { Product } from '@/types/Product';
import axios from 'axios';

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  addedAt: string;
  discount?: number;
  rating?: number;
  colors?: string[];
}

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
  lastUpdated: null
};

// Функция для преобразования продукта в формат WishlistItem
const productToWishlistItem = (product: any): WishlistItem => ({
  id: product._id || product.id,
  productId: product._id || product.id,
  name: product.name,
  price: product.price,
  image: product.images?.[0] || '',
  addedAt: new Date().toISOString(),
  discount: product.discount,
  rating: product.rating,
  colors: product.colors
});

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/wishlist');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Обработка 401 ошибки (неавторизован)
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
        }
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue('Unknown error');
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await WishlistApi.addToWishlist(productId);
      return response.data.products;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem('token');
      }
      return rejectWithValue(
        axios.isAxiosError(error)
          ? error.response?.data?.message || 'Failed to add to wishlist'
          : 'Failed to add to wishlist'
      );
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await WishlistApi.removeFromWishlist(productId);
      return response.data.products;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem('token');
      }
      return rejectWithValue(
        axios.isAxiosError(error)
          ? error.response?.data?.message || 'Failed to remove from wishlist'
          : 'Failed to remove from wishlist'
      );
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
      state.lastUpdated = Date.now();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = (action.payload.products || []).map(productToWishlistItem);
        state.loading = false;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        // Исправлено: action.payload.products вместо action.payload
        state.items = (action.payload.products || []).map(productToWishlistItem);
        state.loading = false;
        state.lastUpdated = Date.now();
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        // Исправлено: action.payload.products вместо action.payload
        state.items = (action.payload.products || []).map(productToWishlistItem);
        state.loading = false;
        state.lastUpdated = Date.now();
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;