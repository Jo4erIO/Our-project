import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // Добавляем прокси для /auth
      '/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      // Оставляем для других API
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
});