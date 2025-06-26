import Container from '../components/ui/Container';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import CartItem from '../components/cart/CartItem';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { items } = useSelector((state: RootState) => state.cart);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container className="py-6">
      {/* Хлебные крошки */}
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
            {/* Таблица с товарами */}
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Товар</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Цена</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Количество</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Итого</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </tbody>
            </table>

            {/* Блок оформления заказа (фиксирован справа) */}
            <div className="mt-4 bg-white p-4 rounded-lg shadow-sm float-right w-72 sticky top-4">
              <div className="mb-3">
                <h3 className="font-bold text-gray-900">Ваш заказ</h3>
                <div className="flex justify-between mt-2 items-center">
                  <span className="text-sm text-gray-600">{items.length} товар</span>
                  <span className="font-medium text-gray-900">{total.toLocaleString()} ₽</span>
                </div>
              </div>

              {/* Кнопка оформления */}
              <Link 
                to="/checkout" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-md text-center font-medium transition-colors shadow-sm block text-sm"
              >
                Перейти к оформлению
              </Link>

              {/* Дополнительная информация */}
              <div className="mt-2 text-xs text-gray-500 text-center">
                Доставка рассчитывается при оформлении
              </div>

              {/* Блок с преимуществами (опционально) */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <ul className="text-xs text-gray-500 space-y-1.5">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-1.5">✓</span>
                    Бесплатная доставка от 5000 ₽
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-1.5">✓</span>
                    Гарантия возврата 14 дней
                  </li>
                </ul>
              </div>
            </div>
              <section className="advantages-section mt-16 bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
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
                className="advantage-card text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
              >
                <div className="advantage-icon text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
            {/* Очистка float */}
            <div className="clear-both"></div>
          </div>
        )}
      </div>
    </Container>
  );
}