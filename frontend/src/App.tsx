import React, { lazy, Suspense, useEffect, ReactNode } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ThemeProvider } from '@/context/ThemeContext';
import '@/index.css';
import { DeviceProvider } from '@/context/DeviceContext';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '@/store';

const HomePage = lazy(() => import('@/pages/HomePage'));
const CartPage = lazy(() => import('@/pages/CartPage'));
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'));
const ProductPage = lazy(() => import('@/pages/ProductPage'));
const CategoryPage = lazy(() => import('@/pages/CategoryPage'));
const WishlistPage = lazy(() => import('@/pages/WishlistPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageAnimation = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const useAuth = () => {
  return useSelector((state: RootState) => state.auth.token);
};

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const token = useAuth();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

const GuestOnly = ({ children }: { children: ReactNode }) => {
  const token = useAuth();
  if (token) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Header />}
      <main className="flex-grow">
        <ScrollToTop />
        <Container className="py-4">
          <Suspense
            fallback={
              <div className="min-h-[50vh] flex items-center justify-center">
                <LoadingSpinner size="lg" />
              </div>
            }
          >
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageAnimation><HomePage /></PageAnimation>} />
                <Route path="/cart" element={<PageAnimation><CartPage /></PageAnimation>} />
                <Route path="/checkout" element={<RequireAuth><PageAnimation><CheckoutPage /></PageAnimation></RequireAuth>} />
                <Route path="/product/:id" element={<PageAnimation><ProductPage /></PageAnimation>} />
                <Route path="/category/:categoryId" element={<PageAnimation><CategoryPage /></PageAnimation>} />
                <Route path="/wishlist" element={<RequireAuth><PageAnimation><WishlistPage /></PageAnimation></RequireAuth>} />
                <Route path="/login" element={<GuestOnly><PageAnimation><LoginPage /></PageAnimation></GuestOnly>} />
                <Route path="/register" element={<GuestOnly><PageAnimation><RegisterPage /></PageAnimation></GuestOnly>} />
                <Route path="*" element={<PageAnimation><NotFoundPage /></PageAnimation>} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </Container>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <DeviceProvider>
          <Provider store={store}>
            <Router>
              <AppContent />
            </Router>
          </Provider>
        </DeviceProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;