// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ThemeProvider } from '@/context/ThemeContext';
import '@/index.css';
import { DeviceProvider } from '@/context/DeviceContext';

// Ленивая загрузка страниц
const HomePage = lazy(() => import('@/pages/HomePage'));
const CartPage = lazy(() => import('@/pages/CartPage'));
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'));
const ProductPage = lazy(() => import('@/pages/ProductPage'));
const CategoryPage = lazy(() => import('@/pages/CategoryPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageAnimation = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <DeviceProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header />
              
              <main className="flex-grow">
                <ScrollToTop />
                <Container className="py-4">
                  <Suspense fallback={
                    <div className="min-h-[50vh] flex items-center justify-center">
                      <LoadingSpinner size="lg" />
                    </div>
                  }>
                    <AnimatePresence mode="wait">
                      <Routes>
                        <Route path="/" element={
                          <PageAnimation>
                            <HomePage />
                          </PageAnimation>
                        } />
                        <Route path="/cart" element={
                          <PageAnimation>
                            <CartPage />
                          </PageAnimation>
                        } />
                        <Route path="/checkout" element={
                          <PageAnimation>
                            <CheckoutPage />
                          </PageAnimation>
                        } />
                        <Route path="/product/:id" element={
                          <PageAnimation>
                            <ProductPage />
                          </PageAnimation>
                        } />
                        <Route path="/category/:categoryId" element={
                          <PageAnimation>
                            <CategoryPage />
                          </PageAnimation>
                        } />
                        <Route path="*" element={
                          <PageAnimation>
                            <NotFoundPage />
                          </PageAnimation>
                        } />
                      </Routes>
                    </AnimatePresence>
                  </Suspense>
                </Container>
              </main>
              
              <Footer />
            </div>
          </Router>
        </DeviceProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;