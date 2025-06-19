
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function CheckoutPage() {
  return (
    <div className="checkout-container">
      <div className="mb-6">
        <Link to="/cart" className="back-link">
          <FiArrowLeft className="mr-2" />
          Назад в корзину
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="checkout-title">Оформление заказа</h1>
        
        <div className="development-notice">
          <div className="development-icon"></div>
          <h2>Раздел в разработке</h2>
          <p>
            Страница оформления заказа находится в разработке. 
            Скоро здесь можно будет оформить заказ!
          </p>
          <Link 
            to="/" 
            className="home-link"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}