import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { WishlistApi } from '@/api/wishlistApi';
import type { Product } from '@/types/Product';

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  addedAt: string;
  discount?: number;
}

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null
};

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await WishlistApi.getWishlist(userId);
      return response.data.products;
    } catch (error) {
      return rejectWithValue('Failed to fetch wishlist');
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async ({ userId, product }: { userId: string; product: Product }, { rejectWithValue }) => {
    try {
      await WishlistApi.addToWishlist(userId, product.id);
      return product;
    } catch (error) {
      return rejectWithValue('Failed to add to wishlist');
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async ({ userId, productId }: { userId: string; productId: string }, { rejectWithValue }) => {
    try {
      await WishlistApi.removeFromWishlist(userId, productId);
      return productId;
    } catch (error) {
      return rejectWithValue('Failed to remove from wishlist');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload.map((product: any) => ({
          id: product._id,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0],
          addedAt: new Date().toISOString(),
          discount: product.discount
        }));
        state.loading = false;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        const product = action.payload;
        if (!state.items.some(item => item.id === product.id)) {
          state.items.push({
            id: product.id,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            addedAt: new Date().toISOString(),
            discount: product.discount
          });
        }
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export default wishlistSlice.reducer;