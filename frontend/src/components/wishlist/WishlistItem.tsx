import { useAppDispatch } from '@/store';
import { addItem } from '@/store/cartSlice';
import { removeFromWishlist } from '@/store/wishlistSlice';
import type { WishlistItem as WishlistItemType } from '@/types/Product';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Props {
  item: WishlistItemType;
  onAddToCart?: () => void;
  onRemove?: () => void;
}

export default function WishlistItem({ item, onAddToCart, onRemove }: Props) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({
      id: item.id,
      productId: item.productId,
      name: item.name,
      price: item.discount
        ? Math.round(item.price * (1 - (item.discount / 100)))
        : item.price,
      quantity: 1,
      image: item.image
    }));
    onAddToCart?.();
  };

  const handleRemove = async () => {
    try {
      // Убрали userId, теперь передаем только ID продукта
      await dispatch(removeFromWishlist(item.productId)).unwrap();
      onRemove?.();
    } catch (error) {
      console.error('Failed to remove:', error);
    }
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
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h3 className="font-medium">{item.name}</h3>
        <div className="mt-2">
          {item.discount ? (
            <div className="flex items-baseline">
              <span className="text-lg font-bold text-red-600 dark:text-red-500">
                {Math.round(item.price * (1 - (item.discount / 100))).toLocaleString()} ₽
              </span>
              <span className="ml-2 text-gray-500 dark:text-gray-400 line-through text-sm">
                {item.price.toLocaleString()} ₽
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold">
              {item.price.toLocaleString()} ₽
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