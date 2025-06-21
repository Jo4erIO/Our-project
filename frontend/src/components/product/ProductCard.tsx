// src/components/product/ProductCard.tsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/cartSlice';
import type { Product } from '../../types/Product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : ''
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const intervalRef = useRef<number | null>(null); // Исправленный тип

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
        image: product.images[0] // Добавлено изображение
      })
    );
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

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="product-card-link h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <button 
          className="favorite-button"
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
        >
          <div className={`favorite-icon ${isFavorite ? 'active' : ''}`}>
            <FiHeart size={20} />
          </div>
        </button>

        <div className="product-image-container">
          {product.images && product.images.length > 0 && !imageError ? (
            <>
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name}
                className="product-image"
                onError={() => setImageError(true)}
              />
              
              {/* Навигация по изображениям */}
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
            <div className="flex items-center justify-center h-full w-full">
              <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                <span>No Image</span>
              </div>
            </div>
          )}
        </div>

        <div className="product-badges">
          {product.discount && (
            <span className="discount-badge">-{product.discount}%</span>
          )}
          {product.stock && product.stock < 10 && (
            <span className="stock-badge">Осталось: {product.stock}</span>
          )}
        </div>
      </div>

      <div className="product-details flex flex-col flex-grow">
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          <div className="stars">
            {'★'.repeat(Math.round(product.rating))}
            {'☆'.repeat(5 - Math.round(product.rating))}
          </div>
          <span className="rating-value">{product.rating.toFixed(1)}</span>
        </div>

        <div className="product-price mt-2 mb-3">
          {product.discount ? (
            <>
              <span className="discounted-price">
                {Math.round(product.price * (1 - product.discount / 100)).toLocaleString()} ₽
              </span>
              <span className="original-price">
                {product.price.toLocaleString()} ₽
              </span>
            </>
          ) : (
            <span className="regular-price">
              {product.price.toLocaleString()} ₽
            </span>
          )}
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="color-selector mb-3">
            <div className="colors-container">
              {product.colors.map(color => (
                <div
                  key={color}
                  className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: getColorHex(color) }}
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

        {product.features && product.features.length > 0 && (
          <div className="product-features mb-3 flex-grow">
            {product.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-check">✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}

        <button 
          className="add-to-cart-button"
          onClick={handleAddToCart}
        >
          Добавить в корзину
        </button>
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