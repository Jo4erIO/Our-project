import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiArrowLeft } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store';
import { addItem } from '@/store/cartSlice';
import Container from '@/components/ui/Container';
import EmptyState from '@/components/ui/EmptyState';
import WishlistItem from '@/components/wishlist/WishlistItem';
import { selectCurrentUserId } from '@/store/authSlice';
import { removeFromWishlist } from '@/store/wishlistSlice';

export default function WishlistPage() {
  const { items } = useAppSelector(state => state.wishlist);
  const userId = useAppSelector(selectCurrentUserId);
  const dispatch = useAppDispatch();

  const handleAddToCart = (item: WishlistItemType) => {
    dispatch(
      addItem({
        id: item.id,
        productId: item.productId,
        name: item.name,
        price: item.discount
          ? Math.round(item.price * (1 - (item.discount / 100)))
          : item.price,
        quantity: 1,
        image: item.image
      })
    );
  };

  const handleRemoveFromWishlist = async (id: string) => {
    if (!userId) return;
    try {
      await dispatch(removeFromWishlist({ userId, productId: id })).unwrap();
    } catch (error) {
      console.error('Failed to remove:', error);
    }
  };

  return (
    <Container className="py-8">
      <div className="mb-6">
        <Link 
          to="/" 
          className="flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          <FiArrowLeft className="mr-2" />
          На главную
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Избранное</h1>

      <AnimatePresence>
        {items.length === 0 ? (
          <EmptyState
            icon={<FiHeart size={48} className="text-pink-500" />}
            title="Список избранного пуст"
            description="Добавляйте товары в избранное, чтобы легко найти их позже"
            action={
              <Link
                to="/"
                className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg inline-flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-md"
              >
                Перейти в каталог
              </Link>
            }
          />
        ) : (
          <div className="grid gap-6">
            {items.map(item => (
              <WishlistItem 
                key={item.id}
                item={item}
                userId={userId || ''}
                onAddToCart={() => handleAddToCart(item)}
                onRemove={() => handleRemoveFromWishlist(item.id)}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </Container>
  );
}

interface WishlistItemType {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  discount?: number;
}