import Container from '../components/ui/Container';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function CheckoutPage() {
  return (
    <Container className="py-8">
      <div className="mb-6">
        <Link to="/cart" className="flex items-center text-indigo-600 hover:text-indigo-800">
          <FiArrowLeft className="mr-2" />
          Назад в корзину
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Оформление заказа</h1>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold mb-2">Раздел в разработке</h2>
          <p className="text-gray-600 mb-6">
            Страница оформления заказа находится в разработке. 
            Скоро здесь можно будет оформить заказ!
          </p>
          <Link 
            to="/" 
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg inline-flex items-center justify-center hover:bg-indigo-700 transition-colors"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </Container>
  );
}