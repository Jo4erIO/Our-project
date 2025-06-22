import Container from '@/components/ui/Container';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { FiHeart, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/Product';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/cartSlice';
import { removeFromWishlist } from '@/store/wishlistSlice';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';

export default function WishlistPage() {
  const { items } = useSelector((state: RootState) => state.wishlist);
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.discount
          ? Math.round(product.price * (1 - product.discount / 100))
          : product.price,
        quantity: 1,
        image: product.images[0]
      })
    );
  };

  const handleRemoveFromWishlist = (id: string) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <Container className="py-8">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
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
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <FiHeart className="text-pink-500" size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Список избранного пуст</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <AnimatePresence>
            {items.map(product => (
              <motion.div 
                key={product.id}
                className="flex items-center border-b py-6 px-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="bg-gray-200 dark:bg-gray-600 rounded-xl w-16 h-16 flex items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-500 text-xs">No Image</span>
                    </div>
                  )}
                </div>
                
                <div className="ml-4 flex-grow">
                  <Link 
                    to={`/product/${product.id}`}
                    className="font-medium hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    {product.name}
                  </Link>
                  <div className="mt-2">
                    {product.discount ? (
                      <div className="flex items-baseline">
                        <span className="text-lg font-bold text-red-600 dark:text-red-500">
                          {Math.round(product.price * (1 - product.discount / 100)).toLocaleString()} ₽
                        </span>
                        <span className="ml-2 text-gray-500 dark:text-gray-400 line-through text-sm">
                          {product.price.toLocaleString()} ₽
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold">
                        {product.price.toLocaleString()} ₽
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAddToCart(product)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Добавить в корзину"
                  >
                    <FiShoppingCart size={20} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                    title="Удалить из избранного"
                  >
                    <FiTrash2 size={20} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </Container>
  );
}