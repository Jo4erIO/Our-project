import { lazy } from 'react';

const HomePage = lazy(() => import('@/pages/HomePage'));
const CartPage = lazy(() => import('@/pages/CartPage'));
const ProductPage = lazy(() => import('@/pages/ProductPage'));
const CategoryPage = lazy(() => import('@/pages/CategoryPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/cart',
    component: CartPage,
  },
  {
    path: '/product/:id',
    component: ProductPage,
  },
  {
    path: '/category/:categoryId',
    component: CategoryPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];