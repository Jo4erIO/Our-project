import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiArrowLeft } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store';
import { addItem } from '@/store/cartSlice';
import { 
  fetchWishlist, 
  removeFromWishlist 
} from '@/store/wishlistSlice';
import Container from '@/components/ui/Container';
import EmptyState from '@/components/ui/EmptyState';
import WishlistItem from '@/components/wishlist/WishlistItem';
import { useEffect, useState } from 'react';

export default function WishlistPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(state => state.wishlist);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    const loadWishlist = async () => {
      try {
        await dispatch(fetchWishlist()).unwrap();
      } catch (err) {
        console.error('Failed to load wishlist:', err);
        const error = err as { message?: string; status?: number };
        if (error.status === 401) {
          localStorage.removeItem('token');
          navigate('/login', { replace: true });
        }
      } finally {
        setInitialLoad(false);
      }
    };

    loadWishlist();
  }, [dispatch, navigate]);

  const handleAddToCart = (item: WishlistItem) => {
    dispatch(
      addItem({
        id: item.id,
        productId: item.productId,
        name: item.name,
        price: item.discount
          ? Math.round(item.price * (1 - (item.discount / 100)))
          : item.price,
        quantity: 1,
        image: item.image,
        color: item.colors?.[0] || ''
      })
    );
  };

  const handleRemoveFromWishlist = async (id: string) => {
    try {
      // Исправлено: передаем только ID продукта
      await dispatch(removeFromWishlist(id)).unwrap();
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  if (initialLoad || loading) {
    return (
      <Container className="py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-8">
        <div className="text-center text-red-500">
          Ошибка загрузки: {error}
        </div>
      </Container>
    );
  }

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

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  discount?: number;
  rating?: number;
  colors?: string[];
}