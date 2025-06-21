import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { fetchProducts } from '../api/ProductsApi';
import type { Product } from '../types/Product';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProductCard from '../components/product/ProductCard';
import HeroBanner from '../components/home/HeroBanner';

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
        setError('Не удалось загрузить товары. Попробуйте обновить страницу.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (error) {
    return (
      <Container className="py-12 text-center">
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-6 py-4 rounded-lg max-w-xl mx-auto">
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

  if (loading) {
    return (
      <Container className="py-12 text-center">
        <LoadingSpinner size="lg" />
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

        {/* Герой баннер */}
        <HeroBanner />

        {/* Хиты продаж */}
        <section className="best-sellers mt-12">
          <div className="section-header flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Хиты продаж</h2>
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Все товары
            </Link>
          </div>

          <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

        {/* Преимущества */}
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
      </Container>
    </>
  );
}