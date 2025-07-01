import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CartApi } from '../api/cartApi';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const CART_KEY = 'techshop_cart';

const loadCartFromStorage = (): CartState => {
  try {
    const savedCart = localStorage.getItem(CART_KEY);
    return savedCart ? JSON.parse(savedCart) : { items: [], loading: false, error: null };
  } catch (error) {
    console.error('Ошибка загрузки корзины:', error);
    return { items: [], loading: false, error: null };
  }
};

const initialState: CartState = loadCartFromStorage();

export const fetchUserCart = createAsyncThunk(
  'cart/fetchUserCart',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await CartApi.getCart(userId);
      return response.data.items;
    } catch (error) {
      return rejectWithValue('Не удалось загрузить корзину');
    }
  }
);

export const syncCartWithBackend = createAsyncThunk(
  'cart/syncCart',
  async (userId: string, { getState, rejectWithValue }) => {
    try {
      const { cart } = getState() as { cart: CartState };
      await CartApi.syncCart(
        userId,
        cart.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      );
    } catch (error) {
      return rejectWithValue('Не удалось синхронизировать корзину');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem(CART_KEY, JSON.stringify(state));
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem(CART_KEY, JSON.stringify(state));
    },
    updateQuantity: (state, action: PayloadAction<{id: string; quantity: number}>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        localStorage.setItem(CART_KEY, JSON.stringify(state));
      }
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem(CART_KEY, JSON.stringify(state));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        localStorage.setItem(CART_KEY, JSON.stringify(state));
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;