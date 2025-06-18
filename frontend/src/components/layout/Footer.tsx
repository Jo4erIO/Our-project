import { FiMail, FiPhone, FiMapPin, FiCreditCard, FiGift, FiShield } from 'react-icons/fi';
import Container from '../ui/Container';
import Logo from '../ui/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-4 text-gray-400">
              Магазин электроники с лучшими ценами и гарантией качества. 
              Более 10 лет на рынке.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center">
                <FiPhone className="text-indigo-400 mr-3" />
                <span>8 (800) 555-35-35</span>
              </div>
              <div className="flex items-center">
                <FiMail className="text-indigo-400 mr-3" />
                <span>info@techshop.ru</span>
              </div>
              <div className="flex items-start">
                <FiMapPin className="text-indigo-400 mr-3 mt-1" />
                <span>г. Москва, ул. Техническая, д. 25</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Категории</h3>
            <ul className="space-y-2">
              {['Смартфоны', 'Ноутбуки', 'Планшеты', 'Наушники', 'Умные часы', 'Фототехника'].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Покупателям</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white flex items-center">
                  <FiCreditCard className="mr-2" /> Оплата
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white flex items-center">
                  <FiGift className="mr-2" /> Доставка
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white flex items-center">
                  <FiShield className="mr-2" /> Гарантия
                </a>
              </li>
              <li><a href="#" className="text-gray-400 hover:text-white">Возврат товара</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Акции</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Подписка</h3>
            <p className="text-gray-400 mb-4">
              Узнавайте первыми о скидках и новинках
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Ваш email"
                className="px-4 py-2 rounded-l-lg flex-grow text-gray-800 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-lg transition-colors"
              >
                OK
              </button>
            </form>
            <div className="mt-6 flex space-x-4">
              {['vk', 'tg', 'youtube', 'dzen'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} TechShop. Все права защищены.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-gray-500 hover:text-white text-sm">Политика конфиденциальности</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm">Пользовательское соглашение</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}