import { useEffect, useState } from 'react';
import Container from '../components/ui/Container';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { motion } from 'framer-motion';
import ProductCard from '../components/product/ProductCard';
import { fetchProducts } from '../api/ProductsApi';
import type { Product } from '../types/Product';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить товары. Попробуйте обновить страницу.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <motion.div 
          key={i} 
          className="border rounded-xl overflow-hidden shadow-md dark:border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 h-48 w-full" />
            <div className="p-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-1/2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </div>
            <div className="h-12 bg-gray-300 dark:bg-gray-600"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  if (error) {
    return (
      <Container className="py-12 text-center">
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg max-w-xl mx-auto">
          <h3 className="font-bold text-lg mb-2">Ошибка!</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Обновить страницу
          </button>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>TechShop - Лучшая электроника по выгодным ценам</title>
        <meta name="description" content="Интернет-магазин электроники с широким ассортиментом товаров и отличным сервисом" />
      </Helmet>
      
      <Container className="py-8">
        <Breadcrumbs />
        
        {/* Герой-секция */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 mb-12 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Техника будущего уже сегодня!</h1>
            <p className="text-xl mb-6">Скидки до 30% на новейшие гаджеты. Ограниченное предложение.</p>
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
              Смотреть акции
            </button>
          </div>
        </motion.div>
        
        {/* Популярные категории */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Популярные категории</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Смартфоны', 'Ноутбуки', 'Наушники', 'Умные часы'].map((category, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-md transition-shadow cursor-pointer group"
                whileHover={{ y: -5 }}
              >
                <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-3 group-hover:scale-110 transition-transform"></div>
                <h3 className="font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{category}</h3>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Хиты продаж */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Хиты продаж</h2>
            <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
              Все товары
            </a>
          </div>
          
          {loading ? (
            renderSkeletons()
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                />
              ))}
            </div>
          )}
        </motion.section>
        
        {/* Преимущества */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Почему выбирают нас</h2>
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
              <motion.div 
                key={index} 
                className="text-center p-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </Container>
    </>
  );
}