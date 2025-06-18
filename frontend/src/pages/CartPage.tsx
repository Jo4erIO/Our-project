import Container from '../components/ui/Container';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

export default function CartPage() {
  const { items } = useSelector((state: RootState) => state.cart);

  return (
    <Container className="py-8">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800">
          <FiArrowLeft className="mr-2" />
          Назад к покупкам
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Ваша корзина</h1>
        
        {items.length === 0 ? (
          <>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <div className="flex items-start">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-yellow-800">
                  <span className="font-semibold">Ваша корзина пуста.</span> Добавьте товары из каталога, чтобы продолжить покупки.
                </p>
              </div>
            </div>
            
            <div className="text-center py-12">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Нет товаров в корзине</h3>
              <p className="text-gray-600 mb-6">Начните покупки, выбрав товары из нашего каталога</p>
              <Link 
                to="/" 
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg inline-flex items-center hover:bg-indigo-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Посмотреть каталог
              </Link>
            </div>
          </>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-grow">
              <div className="space-y-4">
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
            
            <div className="md:w-80 flex-shrink-0">
              <CartSummary items={items} />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}