import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import ProductGrid from '../components/product/ProductGrid';
import { fetchProducts } from '../api/productsApi';
import type { Product } from '../types/Product';
import CategoryTabs from '../components/product/CategoryTabs';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await fetchProducts();
        const filtered = allProducts.filter(
          p => p.category === categoryId
        );
        setProducts(filtered);
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryId]);

  return (
    <Container className="py-8 min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="flex items-center text-indigo-400 hover:text-white">
          <span className="mr-2">←</span>
          На главную
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">
        {categoryId === 'phones' && 'Смартфоны'}
        {categoryId === 'laptops' && 'Ноутбуки'}
        {categoryId === 'headphones' && 'Наушники'}
        {categoryId === 'tablets' && 'Планшеты'}
        {categoryId === 'wearables' && 'Умные часы'}
        {categoryId === 'cameras' && 'Фототехника'}
      </h1>
      
      <CategoryTabs />
      
      {loading ? (
        <div className="text-center py-12">Загрузка товаров...</div>
      ) : (
        <ProductGrid 
          products={products} 
          title="Все товары категории" 
        />
      )}
    </Container>
  );
}