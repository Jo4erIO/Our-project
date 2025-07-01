// src/components/cart/CartItem.tsx
import { useState } from 'react';
import { FiMinus, FiPlus, FiTrash2, FiImage, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../../store/cartSlice';
import { CartApi } from '../../api/cartApi';
import type { CartItem } from '../../store/cartSlice';

interface Props {
  item: CartItem;
  userId?: string;
}

export default function CartItem({ item, userId }: Props) {
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    const quantity = Math.max(1, newQuantity);
    dispatch(updateQuantity({ id: item.id, quantity }));
    
    if (userId) {
      setLoading(true);
      try {
        await CartApi.updateQuantity(userId, item.productId, quantity);
      } catch (error) {
        console.error('Ошибка обновления количества:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemove = async () => {
    dispatch(removeItem(item.id));
    
    if (userId) {
      setLoading(true);
      try {
        await CartApi.removeItem(userId, item.productId);
      } catch (error) {
        console.error('Ошибка удаления товара:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      {/* Товар */}
      <td className="px-6 py-4 whitespace-nowrap w-2/5">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md overflow-hidden mr-4 border border-gray-200">
            {showImage ? (
              item.image && !imageError ? (
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="h-full w-full object-contain p-1"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                  <FiImage className="text-gray-400" />
                </div>
              )
            ) : null}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{item.name}</div>
            <button 
              onClick={() => setShowImage(!showImage)}
              className="mt-1 text-xs text-gray-500 hover:text-gray-700 flex items-center"
            >
              {showImage ? (
                <>
                  <FiChevronUp className="mr-1" size={12} />
                  Скрыть
                </>
              ) : (
                <>
                  <FiChevronDown className="mr-1" size={12} />
                  Показать
                </>
              )}
            </button>
          </div>
        </div>
      </td>

      {/* Цена */}
      <td className="px-6 py-4 whitespace-nowrap w-1/5">
        <div className="text-sm text-gray-900">{item.price.toLocaleString()} ₽</div>
        <div className="text-xs text-gray-500">за шт.</div>
      </td>

      {/* Количество */}
      <td className="px-6 py-4 whitespace-nowrap w-1/5">
        <div className="flex items-center border rounded-md w-fit">
          <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={loading || item.quantity <= 1}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            <FiMinus size={14} />
          </button>
          <span className="px-3 text-center w-8 border-x border-gray-200">
            {item.quantity}
          </span>
          <button 
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={loading}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            <FiPlus size={14} />
          </button>
        </div>
      </td>

      {/* Итого */}
      <td className="px-6 py-4 whitespace-nowrap w-1/5">
        <div className="text-sm font-medium text-gray-900">
          {(item.price * item.quantity).toLocaleString()} ₽
        </div>
        <button 
          onClick={handleRemove}
          disabled={loading}
          className="mt-1 text-xs text-red-500 hover:text-red-700 flex items-center disabled:opacity-50"
        >
          <FiTrash2 className="mr-1" size={12} />
          Удалить
        </button>
      </td>
    </tr>
  );
}