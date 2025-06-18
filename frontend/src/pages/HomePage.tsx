import { useEffect, useState } from 'react';
import Container from '../components/ui/Container';
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
        <div key={i} className="border rounded-xl overflow-hidden shadow-md animate-pulse">
          <div className="bg-gray-200 h-48 w-full" />
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-3 w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="h-12 bg-gray-300"></div>
        </div>
      ))}
    </div>
  );

  if (error) {
    return (
      <Container className="py-12 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-xl mx-auto">
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
    <Container className="py-8">
      {/* Герой-секция */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 mb-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Техника будущего уже сегодня!</h1>
          <p className="text-xl mb-6">Скидки до 30% на новейшие гаджеты. Ограниченное предложение.</p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
            Смотреть акции
          </button>
        </div>
      </div>
      
      {/* Популярные категории */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Популярные категории</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Смартфоны', 'Ноутбуки', 'Наушники', 'Умные часы'].map((category, index) => (
            <div 
              key={index} 
              className="bg-gray-100 rounded-xl p-6 text-center hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-3 group-hover:scale-110 transition-transform"></div>
              <h3 className="font-medium group-hover:text-indigo-600 transition-colors">{category}</h3>
            </div>
          ))}
        </div>
      </section>
      
      {/* Хиты продаж */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Хиты продаж</h2>
          <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
            Все товары
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
        
        {loading ? (
          renderSkeletons()
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard 
                key={product.id}  
                product={product} 
              />
            ))}
          </div>
        )}
      </section>
      
      {/* Преимущества */}
      <section className="mt-16 bg-gray-50 rounded-2xl p-8">
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
            <div key={index} className="text-center p-4">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}