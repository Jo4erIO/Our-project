import { useState } from 'react';
import { FiShoppingCart, FiHeart, FiLoader } from 'react-icons/fi';
import type { Product } from '../../types/Product';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/cartSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.[0] || ''
  );
  const dispatch = useDispatch();
  
  const discountedPrice = product.discount 
    ? Math.round(product.price * (1 - product.discount / 100))
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch(addItem({
      id: `${product.id}-${selectedColor}`,
      name: `${product.name}${selectedColor ? ` (${selectedColor})` : ''}`,
      price: discountedPrice || product.price,
      quantity: 1
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full" // Добавлен класс для высоты
    >
      <Link 
        to={`/product/${product.id}`} 
        className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group relative"
      >
        <motion.button 
          className="absolute top-3 right-3 z-10"
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
        >
          <div className={`p-2 rounded-full ${
            isFavorite 
              ? 'text-red-500 bg-red-50 shadow-md' 
              : 'text-gray-400 bg-white hover:text-red-500'
          } transition-colors`}>
            <FiHeart className={isFavorite ? 'fill-current' : ''} />
          </div>
        </motion.button>
        
        <div className="bg-gray-50 p-4 flex justify-center items-center flex-grow relative overflow-hidden min-h-[200px]">
          {product.images && product.images.length > 0 ? (
            <>
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiLoader className="animate-spin text-gray-300" size={24} />
                </div>
              )}
              <img 
                src={product.images[0]} 
                alt={product.name}
                className={`object-contain w-full h-48 transition-transform duration-300 group-hover:scale-105 ${
                  isImageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => setIsImageLoading(false)}
              />
            </>
          ) : (
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
          )}
          
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.discount && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{product.discount}%
              </span>
            )}
            
            {product.stock !== undefined && product.stock < 10 && (
              <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                Осталось: {product.stock} шт.
              </span>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {'★'.repeat(Math.round(product.rating))}
              {'☆'.repeat(5 - Math.round(product.rating))}
            </div>
            <span className="text-gray-500 ml-2 text-sm">({product.rating})</span>
          </div>
          
          <div className="flex items-end mb-3">
            {discountedPrice ? (
              <>
                <span className="text-xl font-bold text-red-600">
                  {discountedPrice.toLocaleString()} ₽
                </span>
                <span className="text-gray-500 line-through ml-2 text-sm">
                  {product.price.toLocaleString()} ₽
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-800">
                {product.price.toLocaleString()} ₽
              </span>
            )}
          </div>
          
          {/* Блок выбора цвета */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-3">
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedColor(color);
                    }}
                    className={`w-5 h-5 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-indigo-600 scale-110'
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Цвет ${color}`}
                  />
                ))}
              </div>
            </div>
          )}
          
          {product.features && (
            <ul className="text-sm text-gray-600 mb-3 space-y-1">
              {product.features.slice(0, 2).map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <motion.button
          onClick={handleAddToCart}
          className="mt-auto bg-indigo-600 text-white py-3 flex items-center justify-center hover:bg-indigo-700 transition-colors group-hover:bg-indigo-700"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiShoppingCart className="mr-2" />
          В корзину
        </motion.button>
      </Link>
    </motion.div>
  );
}