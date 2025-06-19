import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color?: string; // Добавлено поле для цвета
}

interface CartState {
  items: CartItem[];
}

const CART_KEY = 'techshop_cart';

// Загрузка корзины из localStorage
const loadCartFromStorage = (): CartState => {
  try {
    const savedCart = localStorage.getItem(CART_KEY);
    return savedCart ? JSON.parse(savedCart) : { items: [] };
  } catch (error) {
    console.error('Ошибка загрузки корзины:', error);
    return { items: [] };
  }
};

// Начальное состояние из localStorage
const initialState: CartState = loadCartFromStorage();

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
      
      // Сохраняем в localStorage
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
  }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;