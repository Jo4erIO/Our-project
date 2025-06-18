import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

interface Props {
  items: {
    id: string;
    price: number;
    quantity: number;
  }[];
}

export default function CartSummary({ items }: Props) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <div className="mt-8 bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Итог заказа</h2>
      
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span>Товары:</span>
          <span>{subtotal.toLocaleString()} ₽</span>
        </div>
        <div className="flex justify-between">
          <span>Доставка:</span>
          <span>{shipping === 0 ? 'Бесплатно' : `${shipping.toLocaleString()} ₽`}</span>
        </div>
        <div className="border-t border-gray-300 my-2 pt-2 flex justify-between font-bold text-lg">
          <span>Итого:</span>
          <span>{total.toLocaleString()} ₽</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        <Link 
          to="/checkout" 
          className="bg-indigo-600 text-white py-3 rounded-lg text-center hover:bg-indigo-700 transition-colors"
        >
          Перейти к оформлению
        </Link>
        
        <Link 
          to="/" 
          className="flex items-center justify-center text-indigo-600 hover:text-indigo-800"
        >
          <FiArrowLeft className="mr-2" />
          Продолжить покупки
        </Link>
      </div>
    </div>
  );
}