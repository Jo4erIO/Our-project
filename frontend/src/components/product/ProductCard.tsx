import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import type { Product } from '../../types/Product';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/cartSlice';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Предотвращаем переход по ссылке
    e.stopPropagation(); // Останавливаем всплытие события
    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: discountedPrice || product.price,
      quantity: 1
    }));
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group relative"
    >
      <div className="absolute top-3 right-3 z-10">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`p-2 rounded-full ${isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 bg-white'} hover:text-red-500 transition-colors`}
        >
          <FiHeart className={isFavorite ? 'fill-current' : ''} />
        </button>
      </div>
      
      <div className="bg-gray-100 p-4 flex justify-center flex-grow relative overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <div 
            className="bg-cover bg-center w-full h-48 transition-transform group-hover:scale-105" 
            style={{ backgroundImage: `url(${product.images[0]})` }}
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
        )}
        
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}
        
        {product.stock && product.stock < 10 && (
          <div className="absolute bottom-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
            Осталось: {product.stock} шт.
          </div>
        )}
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
      
      <button
        onClick={handleAddToCart}
        className="mt-auto bg-indigo-600 text-white py-3 flex items-center justify-center hover:bg-indigo-700 transition-colors group-hover:bg-indigo-700"
      >
        <FiShoppingCart className="mr-2" />
        В корзину
      </button>
    </Link>
  );
}