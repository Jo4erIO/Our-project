import { Product } from '@/types/Product';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/cartSlice';
import { removeFromWishlist } from '@/store/wishlistSlice';
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface WishlistItemProps {
  product: Product;
}

export default function WishlistItem({ product }: WishlistItemProps) {
  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: product.discount
        ? Math.round(product.price * (1 - product.discount / 100))
        : product.price,
      quantity: 1,
      image: product.images[0]
    }));
  };

  const handleRemove = () => {
    dispatch(removeFromWishlist(product.id));
  };

  return (
    <motion.div 
      className="flex items-center border-b py-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="bg-gray-200 dark:bg-gray-700 rounded-xl w-16 h-16 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500">No Image</span>
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
          onClick={handleAddToCart}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Добавить в корзину"
        >
          <FiShoppingCart size={20} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRemove}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
          title="Удалить из избранного"
        >
          <FiTrash2 size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
}