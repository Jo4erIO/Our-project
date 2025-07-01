import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiChevronLeft, FiChevronRight, FiShoppingCart } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store';
import { addItem } from '@/store/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/store/wishlistSlice';
import { selectCurrentUserId } from '@/store/authSlice';
import type { Product } from '@/types/Product';
import { useDevice } from '@/context/DeviceContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const productImages = product.images || [];
  const availableColors = product.colors || [];
  const productRating = product.rating || 0;
  const productDiscount = product.discount || 0;

  const [selectedColor, setSelectedColor] = useState(availableColors[0] || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const { isMobile } = useDevice();
  const dispatch = useAppDispatch();
  
  const { items: wishlistItems } = useAppSelector(state => state.wishlist);
  const userId = useAppSelector(selectCurrentUserId);
  const isFavorite = wishlistItems.some(item => item.id === product.id);

  useEffect(() => {
    if (productImages.length > 1 && !isHovered) {
      intervalRef.current = window.setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % productImages.length);
      }, 3000);
    }
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [productImages.length, isHovered]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (productImages.length === 0) return;

    dispatch(
      addItem({
        id: `${product.id}-${selectedColor || 'default'}`,
        productId: product.id,
        name: `${product.name}${selectedColor ? ` (${selectedColor})` : ''}`,
        price: productDiscount > 0
          ? Math.round(product.price * (1 - productDiscount / 100))
          : product.price,
        quantity: 1,
        image: productImages[0],
        color: selectedColor || undefined
      })
    );
    
    const button = e.currentTarget;
    button.classList.add('animate-ping');
    setTimeout(() => button.classList.remove('animate-ping'), 500);
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!userId) {
      console.warn('User not authenticated');
      return;
    }

    try {
      if (isFavorite) {
        await dispatch(removeFromWishlist({ userId, productId: product.id })).unwrap();
      } else {
        await dispatch(addToWishlist({ userId, product })).unwrap();
      }
    } catch (error) {
      console.error('Wishlist error:', error);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (productImages.length > 0) {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % productImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (productImages.length > 0) {
      setCurrentImageIndex(prevIndex => (prevIndex - 1 + productImages.length) % productImages.length);
    }
  };

  if (isMobile) {
    return (
      <motion.div 
        className={`relative ${className}`}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <motion.button
          className="absolute top-2 right-2 z-10 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-md"
          onClick={handleWishlistToggle}
          whileTap={{ scale: 0.9 }}
          initial={false}
          animate={{
            color: isFavorite ? '#ef4444' : '#9ca3af',
            fill: isFavorite ? '#ef4444' : 'transparent'
          }}
          transition={{ duration: 0.2 }}
        >
          <FiHeart size={18} />
        </motion.button>
        
        <Link
          to={`/product/${product.id}`}
          className="flex flex-col border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
        >
          <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
            {productImages.length > 0 && !imageError ? (
              <img
                src={productImages[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-contain p-4"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                <span className="text-gray-400 dark:text-gray-500">No Image</span>
              </div>
            )}
            
            {productImages.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                {productImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-indigo-600'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="p-3">
            <h3 className="font-medium line-clamp-2 h-12 text-gray-900 dark:text-gray-100">
              {product.name}
            </h3>
            
            <div className="mt-2 flex justify-between items-center">
              <div>
                {productDiscount > 0 ? (
                  <>
                    <span className="font-bold text-red-600 dark:text-red-500">
                      {Math.round(product.price * (1 - productDiscount / 100)).toLocaleString()} ₽
                    </span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400 line-through text-sm">
                      {product.price.toLocaleString()} ₽
                    </span>
                  </>
                ) : (
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    {product.price.toLocaleString()} ₽
                  </span>
                )}
              </div>
            </div>
            
            {availableColors.length > 0 && (
              <div className="mt-3">
                <div className="flex flex-wrap gap-1">
                  {availableColors.map(color => (
                    <button
                      key={color}
                      className={`w-5 h-5 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? 'border-indigo-600 shadow-lg scale-110'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      style={{
                        backgroundColor: getColorHex(color),
                        boxShadow: selectedColor === color
                          ? '0 0 0 2px white, 0 0 0 4px rgb(79 70 229)'
                          : 'none'
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedColor(color);
                      }}
                      title={color}
                      aria-label={`Выбрать цвет ${color}`}
                    />
                  ))}
                </div>
                {selectedColor && (
                  <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                    Выбрано: {selectedColor}
                  </div>
                )}
              </div>
            )}
            
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.95 }}
              className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
              disabled={productImages.length === 0}
            >
              <FiShoppingCart size={16} />
              <span>В корзину</span>
            </motion.button>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
        onClick={handleWishlistToggle}
        whileTap={{ scale: 0.9 }}
        initial={false}
        animate={{
          color: isFavorite ? '#ef4444' : '#9ca3af',
          fill: isFavorite ? '#ef4444' : 'transparent'
        }}
        transition={{ duration: 0.2 }}
      >
        <FiHeart size={20} />
      </motion.button>

      {productDiscount > 0 && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-md z-10">
          -{productDiscount}%
        </span>
      )}

      <Link to={`/product/${product.id}`} className="block aspect-square relative">
        {productImages.length > 0 && !imageError ? (
          <>
            <img
              src={productImages[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-contain p-4"
              loading="lazy"
              onError={() => setImageError(true)}
            />
            
            {productImages.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={prevImage}
                >
                  <FiChevronLeft size={20} />
                </button>
                <button
                  className="absolute top-1/2 right-2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={nextImage}
                >
                  <FiChevronRight size={20} />
                </button>
              
                <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-1.5">
                  {productImages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-indigo-600 w-4'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
            <span className="text-gray-400 dark:text-gray-500">No Image</span>
          </div>
        )}
      </Link>

      <div className="p-4">
        <Link 
          to={`/product/${product.id}`}
          className="font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-2 mb-2 block"
        >
          {product.name}
        </Link>

        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400 mr-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>
                {i < Math.round(productRating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({productRating.toFixed(1)})
          </span>
        </div>

        <div className="flex items-baseline justify-between mb-3">
          <div>
            {productDiscount > 0 ? (
              <>
                <span className="text-lg font-bold text-red-600 dark:text-red-500">
                  {Math.round(product.price * (1 - productDiscount / 100)).toLocaleString()} ₽
                </span>
                <span className="ml-2 text-gray-500 dark:text-gray-400 line-through text-sm">
                  {product.price.toLocaleString()} ₽
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {product.price.toLocaleString()} ₽
              </span>
            )}
          </div>
        </div>

        {availableColors.length > 0 && (
          <div className="mb-3">
            <div className="text-sm font-medium mb-2">Цвет: {selectedColor || 'не выбран'}</div>
            <div className="flex flex-wrap gap-1">
              {availableColors.map(color => (
                <button
                  key={color}
                  className={`w-5 h-5 rounded-full border-2 transition-all ${
                    selectedColor === color
                      ? 'border-indigo-600 shadow-lg scale-110'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  style={{
                    backgroundColor: getColorHex(color),
                    boxShadow: selectedColor === color
                      ? '0 0 0 2px white, 0 0 0 4px rgb(79 70 229)'
                      : 'none'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(color);
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        <motion.button
          onClick={handleAddToCart}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md flex items-center justify-center gap-2 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={productImages.length === 0}
        >
          <FiShoppingCart size={18} />
          <span>В корзину</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    'черный': '#000000',
    'чёрный': '#000000',
    'белый': '#FFFFFF',
    'серебристый': '#C0C0C0',
    'серебро': '#C0C0C0',
    'золотой': '#FFD700',
    'золото': '#FFD700',
    'синий': '#0000FF',
    'голубой': '#00BFFF',
    'красный': '#FF0000',
    'розовый': '#FFC0CB',
    'зеленый': '#008000',
    'зелёный': '#008000',
    'фиолетовый': '#800080',
    'оранжевый': '#FFA500',
    'желтый': '#FFFF00',
    'жёлтый': '#FFFF00',
    'серый': '#808080',
    'бежевый': '#F5F5DC',
    'коричневый': '#A52A2A',
    'бирюзовый': '#40E0D0',
    'бордовый': '#800000',
    'салатовый': '#7FFF00',
    'сиреневый': '#C8A2C8',
    'хаки': '#C3B091',
    'прозрачный': 'transparent',
    'midnight': '#191970',
    'starlight': '#E5E4E2',
    'product red': '#E60026',
    'серый космос': '#4C5866'
  };

  return colorMap[colorName.toLowerCase()] || colorName;
}