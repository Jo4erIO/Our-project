import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/cartSlice';
import type { Product } from '@/types/Product';
import { useDevice } from '@/context/DeviceContext';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { addToWishlist, removeFromWishlist } from '@/store/wishlistSlice';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : ''
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const { isMobile } = useDevice();
  
  // Wishlist state
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isFavorite = wishlistItems.some(item => item.id === product.id);

  // Состояния для обработки свайпа
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  // Автоматическое переключение изображений
  useEffect(() => {
    if (product.images && product.images.length > 1 && !isHovered) {
      intervalRef.current = window.setInterval(() => {
        setCurrentImageIndex(prevIndex =>
          (prevIndex + 1) % product.images.length
        );
      }, 1500000);
    }
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [product.images, isHovered]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(
      addItem({
        id: `${product.id}-${selectedColor}`,
        name: `${product.name}${selectedColor ? ` (${selectedColor})` : ''}`,
        price: product.discount
          ? Math.round(product.price * (1 - product.discount / 100))
          : product.price,
        quantity: 1,
        image: product.images[0]
      })
    );
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex(prevIndex =>
        (prevIndex + 1) % product.images.length
      );
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex(prevIndex =>
        (prevIndex - 1 + product.images.length) % product.images.length
      );
    }
  };

  // Обработчики для свайпа на мобильных устройствах
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      if (product.images && product.images.length > 0) {
        setCurrentImageIndex(prevIndex =>
          (prevIndex + 1) % product.images.length
        );
      }
    } else if (touchEnd - touchStart > 50) {
      if (product.images && product.images.length > 0) {
        setCurrentImageIndex(prevIndex =>
          (prevIndex - 1 + product.images.length) % product.images.length
        );
      }
    }
  };

  // Для мобильных устройств - компактный вид с поддержкой свайпа
  if (isMobile) {
    return (
      <div className="relative">
        <button
          className="absolute top-2 right-2 z-10 p-1 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-sm"
          onClick={handleWishlistToggle}
        >
          <FiHeart className={isFavorite ? "text-red-500 fill-current" : ""} size={16} />
        </button>
        
        <Link
          to={`/product/${product.id}`}
          className="product-card-link flex flex-col border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative">
            {/* Изображение товара с поддержкой свайпа */}
            <div
              ref={imageRef}
              className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative overflow-hidden touch-pan-x"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {product.images && product.images.length > 0 && !imageError ? (
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="h-full object-contain"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                  <span>No Image</span>
                </div>
              )}
              
              {/* Индикаторы изображений для мобильной версии */}
              {product.images && product.images.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                  {product.images.map((_, index) => (
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
          
            {/* Информация о товаре */}
            <div className="p-3">
              <h3 className="font-medium line-clamp-2 h-12">{product.name}</h3>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  {product.discount ? (
                    <>
                      <span className="font-bold text-red-600 dark:text-red-500">
                        {Math.round(product.price * (1 - product.discount / 100)).toLocaleString()} ₽
                      </span>
                      <span className="ml-2 text-gray-500 dark:text-gray-400 line-through text-sm">
                        {product.price.toLocaleString()} ₽
                      </span>
                    </>
                  ) : (
                    <span className="font-bold">
                      {product.price.toLocaleString()} ₽
                    </span>
                  )}
                </div>
              </div>
              
              {/* Выбор цвета для мобильной версии */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1">
                    {product.colors.map(color => (
                      <div
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
                  <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                    Выбрано: {selectedColor}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // Для десктопных устройств - полный вид с кнопками переключения
  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card-link h-full flex flex-col border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <button
          className="absolute top-3 right-3 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={handleWishlistToggle}
        >
          <FiHeart className={isFavorite ? "text-red-500 fill-current" : ""} size={18} />
        </button>
        
        <div className="h-56 bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative product-image-container">
          {product.images && product.images.length > 0 && !imageError ? (
            <>
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="h-full object-contain"
                onError={() => setImageError(true)}
              />
              
              {/* Оригинальные стрелки переключения для десктопной версии */}
              {product.images.length > 1 && (
                <>
                  <button
                    className="image-nav-button left-2"
                    onClick={prevImage}
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  <button
                    className="image-nav-button right-2"
                    onClick={nextImage}
                  >
                    <FiChevronRight size={20} />
                  </button>
                
                  {/* Индикаторы изображений */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-1.5 z-10">
                    {product.images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'bg-white w-4'
                            : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
              <span>No Image</span>
            </div>
          )}
        </div>
        
        <div className="p-4 flex-grow">
          <h3 className="font-medium mb-2 line-clamp-2 h-12">{product.name}</h3>
          
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400 mr-2">
              {'★'.repeat(Math.round(product.rating))}
              {'☆'.repeat(5 - Math.round(product.rating))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {product.rating.toFixed(1)}
            </span>
          </div>
          
          <div className="mb-3">
            {product.discount ? (
              <div className="flex items-baseline">
                <span className="text-xl font-bold text-red-600 dark:text-red-500">
                  {Math.round(product.price * (1 - product.discount / 100)).toLocaleString()} ₽
                </span>
                <span className="ml-2 text-gray-500 dark:text-gray-400 line-through">
                  {product.price.toLocaleString()} ₽
                </span>
                <span className="ml-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs px-1.5 py-0.5 rounded">
                  -{product.discount}%
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold">
                {product.price.toLocaleString()} ₽
              </span>
            )}
          </div>
          
          {product.colors && product.colors.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-2">Цвет: {selectedColor}</h4>
              <div className="flex flex-wrap gap-1">
                {product.colors.map(color => (
                  <div
                    key={color}
                    className={`w-5 h-5 rounded-full border-2 transition-all cursor-pointer ${
                      selectedColor === color
                        ? 'border-indigo-600 shadow-lg scale-110'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    style={{
                      backgroundColor: getColorHex(color),
                      boxShadow: selectedColor === color
                        ? '0 0 0 2px white, 0 0 0 4px rgb(79 70 229)'
                        : 'none',
                      animation: selectedColor === color
                        ? 'pulse 1s ease'
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
          
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition-colors"
            onClick={handleAddToCart}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </Link>
  );
}

// Вспомогательная функция для преобразования названий цветов в HEX
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

  return colorMap[colorName.toLowerCase()] || '#CCCCCC';
}
