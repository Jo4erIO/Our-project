import { useState } from 'react';
import { FiMinus, FiPlus, FiTrash2, FiImage } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../../store/cartSlice';
import type { CartItem } from '../../store/cartSlice';

interface Props {
  item: CartItem;
}

export default function CartItem({ item }: Props) {
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex items-center border-b py-4">
      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
        {item.image && !imageError ? (
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-contain p-1"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="bg-gray-200 rounded-xl w-16 h-16 flex items-center justify-center">
            <FiImage size={24} className="text-gray-400" />
          </div>
        )}
      </div>
      
      <div className="ml-4 flex-grow">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-gray-600">{item.price.toLocaleString()} ₽</p>
      </div>
      
      <div className="flex items-center">
        <button 
          onClick={() => dispatch(updateQuantity({
            id: item.id, 
            quantity: Math.max(1, item.quantity - 1)
          }))}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <FiMinus />
        </button>
        <span className="mx-2 w-8 text-center">{item.quantity}</span>
        <button 
          onClick={() => dispatch(updateQuantity({
            id: item.id, 
            quantity: item.quantity + 1
          }))}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <FiPlus />
        </button>
      </div>
      
      <div className="ml-6 w-24 text-right font-medium">
        {(item.price * item.quantity).toLocaleString()} ₽
      </div>
      
      <button 
        onClick={() => dispatch(removeItem(item.id))}
        className="ml-4 text-red-500 hover:text-red-700"
      >
        <FiTrash2 size={20} />
      </button>
    </div>
  );
}