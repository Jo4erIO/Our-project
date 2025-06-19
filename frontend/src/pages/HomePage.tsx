// src/pages/Homepage.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { fetchProducts } from '../api/ProductsApi';
import type { Product } from '../types/Product';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProductCard from '../components/product/ProductCard';

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

  // Категории с реальными данными
  const categories = [
    { 
      id: 'phones', 
      name: 'Смартфоны', 
      icon: '📱',
      count: products.filter(p => p.category === 'phones').length
    },
    { 
      id: 'laptops', 
      name: 'Ноутбуки', 
      icon: '💻',
      count: products.filter(p => p.category === 'laptops').length
    },
    { 
      id: 'headphones', 
      name: 'Наушники', 
      icon: '🎧',
      count: products.filter(p => p.category === 'headphones').length
    },
    { 
      id: 'wearables', 
      name: 'Умные часы', 
      icon: '⌚',
      count: products.filter(p => p.category === 'wearables').length
    },
    { 
      id: 'tablets', 
      name: 'Планшеты', 
      icon: '📱',
      count: products.filter(p => p.category === 'tablets').length
    },
    { 
      id: 'cameras', 
      name: 'Фототехника', 
      icon: '📷',
      count: products.filter(p => p.category === 'cameras').length
    }
  ];

  if (error) {
    return (
      <Container className="py-12 text-center">
        <div className="error-message">
          <h3>Ошибка!</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="refresh-button"
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
        
        {/* Герой-секция */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>Техника будущего уже сегодня!</h1>
            <p>Скидки до 30% на новейшие гаджеты. Ограниченное предложение.</p>
            <button className="cta-button">
              Смотреть акции
            </button>
          </div>
        </div>
        
        {/* Популярные категории */}
        <section className="categories-section">
          <h2 className="text-2xl font-bold mb-6">Популярные категории</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <Link 
                to={`/category/${category.id}`} 
                key={category.id}
                className="category-card group"
              >
                <div className="category-icon flex items-center justify-center text-3xl transition-transform group-hover:scale-110">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {category.count} товаров
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Хиты продаж */}
        <section className="best-sellers">
          <div className="section-header">
            <h2>Хиты продаж</h2>
            <a href="#" className="view-all">
              Все товары
            </a>
          </div>
          
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>
        </section>
        
        {/* Преимущества */}
        <section className="advantages-section">
          <h2>Почему выбирают нас</h2>
          <div className="advantages-grid">
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
                className="advantage-card"
              >
                <div className="advantage-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}