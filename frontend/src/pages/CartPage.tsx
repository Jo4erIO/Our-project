// src/pages/CartPage.tsx
import Container from '../components/ui/Container';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { items } = useSelector((state: RootState) => state.cart);

  return (
    <Container className="py-8">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800">
          <FiArrowLeft className="mr-2" />
          Назад к покупкам
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Ваша корзина</h1>
        
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="bg-indigo-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <FiShoppingBag className="text-indigo-600" size={48} />
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Корзина пуста</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Похоже, вы еще не добавили товары в корзину. Начните покупки прямо сейчас!
            </p>
            
            <Link 
              to="/" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg inline-flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-md"
            >
              <FiArrowLeft className="mr-2 transform rotate-180" />
              Перейти в каталог
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-grow">
              <div className="space-y-4">
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
            
            <div className="md:w-80 flex-shrink-0">
              <CartSummary items={items} />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}