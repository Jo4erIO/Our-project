import Container from '@/components/ui/Container';
import ProductCard from '@/components/product/ProductCard';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { FiHeart, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function WishlistPage() {
  const { items } = useSelector((state: RootState) => state.wishlist);

  return (
    <Container className="py-8">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800">
          <FiArrowLeft className="mr-2" />
          На главную
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Избранное</h1>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="bg-pink-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <FiHeart className="text-pink-500" size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Список избранного пуст</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Добавляйте товары в избранное, чтобы легко найти их позже
          </p>
          <Link
            to="/"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg inline-flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-md"
          >
            Перейти в каталог
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
}