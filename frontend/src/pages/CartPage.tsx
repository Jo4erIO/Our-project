import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchUserCart, syncCartWithBackend } from '../store/cartSlice';
import Container from '../components/ui/Container';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAppDispatch } from '../store';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.cart);
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Загружаем корзину при монтировании
  useEffect(() => {
    if (isAuthenticated && userId) {
      dispatch(fetchUserCart(userId));
    }
  }, [dispatch, isAuthenticated, userId]);

  // Синхронизируем при размонтировании
  useEffect(() => {
    return () => {
      if (isAuthenticated && userId && items.length > 0) {
        dispatch(syncCartWithBackend(userId));
      }
    };
  }, [dispatch, isAuthenticated, userId, items]);

  if (!isAuthenticated) {
    return (
      <Container className="py-6">
        <div className="text-center py-12">
          <div className="bg-indigo-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <FiShoppingBag className="text-indigo-600" size={36} />
          </div>
          <h2 className="text-xl font-bold mb-3">Требуется авторизация</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6 text-sm">
            Для просмотра корзины необходимо войти в систему
          </p>
          <Link 
            to="/login" 
            state={{ from: '/cart' }}
            className="bg-indigo-600 text-white px-5 py-2 rounded-md inline-flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-sm text-sm"
          >
            Войти в аккаунт
          </Link>
        </div>
      </Container>
    );
  }

  if (loading && items.length === 0) {
    return (
      <Container className="py-6">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-6">
        <div className="text-center text-red-500">
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => userId && dispatch(fetchUserCart(userId))}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Попробовать снова
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-6">
      <div className="mb-4">
        <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm">
          <FiArrowLeft className="mr-1" size={14} />
          Назад к покупкам
        </Link>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Доступны для заказа</h1>
        
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="bg-indigo-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <FiShoppingBag className="text-indigo-600" size={36} />
            </div>
            
            <h2 className="text-xl font-bold mb-3">Корзина пуста</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6 text-sm">
              Похоже, вы еще не добавили товары в корзину.
            </p>
            
            <Link 
              to="/" 
              className="bg-indigo-600 text-white px-5 py-2 rounded-md inline-flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-sm text-sm"
            >
              Перейти в каталог
            </Link>
          </motion.div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Товар</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Цена</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Количество</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Итого</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map(item => (
                  <CartItem key={item.id} item={item} userId={userId} />
                ))}
              </tbody>
            </table>

            <div className="mt-4 bg-white p-4 rounded-lg shadow-sm float-right w-72 sticky top-4">
              <CartSummary items={items} userId={userId} />
            </div>
            
            <div className="clear-both"></div>
            
            <section className="mt-16 bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-center mb-8">Почему выбирают нас</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Бесплатная доставка',
                    desc: 'По всей России при заказе от 5000₽',
                    icon: '🚚'
                  },
                  {
                    title: 'Гарантия 2 года',
                    desc: 'Официальная гарантия на всю технику',
                    icon: '🔧'
                  },
                  {
                    title: 'Скидки постоянным клиентам',
                    desc: 'Накопительная система бонусов',
                    icon: '🎁'
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-white rounded-lg shadow-sm"
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </Container>
  );
}