import { useEffect, useState } from 'react';
import { fetchProducts } from '../../api/ProductsApi';
import type { Product } from '../../types/Product';
import ProductCard from './ProductCard';

interface Props {
  currentProductId: string;
  category: string;
}

export default function SimilarProducts({ currentProductId, category }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSimilarProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await fetchProducts();
        // Фильтруем товары той же категории, исключая текущий
        const similar = allProducts.filter(
          p => p.category === category && p.id !== currentProductId
        ).slice(0, 4); // Берем первые 4 товара
        setProducts(similar);
      } catch (error) {
        console.error('Ошибка загрузки похожих товаров:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSimilarProducts();
  }, [category, currentProductId]);

  if (loading) {
    return (
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
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        Нет похожих товаров
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}