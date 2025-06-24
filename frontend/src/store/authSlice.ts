// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getToken, setToken, removeToken } from '@/utils/auth';

type User = {
  id: number;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: getToken(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = payload.user;
      state.token = payload.token;
      setToken(payload.token);
    },
    logout: state => {
      state.user = null;
      state.token = null;
      removeToken();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;