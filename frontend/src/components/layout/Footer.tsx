import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaVk, FaTelegram, FaYoutube } from 'react-icons/fa';
import { SiDazn } from 'react-icons/si';
import Container from '../ui/Container';
import Logo from '../ui/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Блок с лого и контактами */}
          <div className="space-y-6">
            <div className="flex justify-center md:justify-start">
              <Logo />
            </div>
            <p className="text-gray-400 leading-relaxed text-center md:text-left">
              Магазин электроники с лучшими ценами и гарантией качества.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center group justify-center md:justify-start">
                <div className="bg-indigo-600 p-2 rounded-lg mr-3 group-hover:rotate-12 transition-transform">
                  <FiPhone className="text-white" />
                </div>
                <span className="group-hover:text-indigo-400 transition-colors">8 (800) 555-35-35</span>
              </div>
              <div className="flex items-center group justify-center md:justify-start">
                <div className="bg-indigo-600 p-2 rounded-lg mr-3 group-hover:rotate-12 transition-transform">
                  <FiMail className="text-white" />
                </div>
                <span className="group-hover:text-indigo-400 transition-colors">info@techshop.ru</span>
              </div>
              <div className="flex items-start group justify-center md:justify-start">
                <div className="bg-indigo-600 p-2 rounded-lg mr-3 mt-1 group-hover:rotate-12 transition-transform">
                  <FiMapPin className="text-white" />
                </div>
                <span className="group-hover:text-indigo-400 transition-colors">г. Москва, ул. Техническая, д. 25</span>
              </div>
            </div>
          </div>
          
          {/* Пустой блок для центрирования */}
          <div></div>
          
          {/* Блок подписки */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-lg font-semibold mb-4">
              Мы в соцсетях
            </h3>
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <FaVk />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <FaTelegram />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <FaYoutube />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <SiDazn />
              </a>
            </div>
          </div>
        </div>
        
        {/* Нижняя часть футера */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} TechShop. Все права защищены.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-gray-500 hover:text-indigo-400 text-sm transition-colors">Политика конфиденциальности</a>
            <a href="#" className="text-gray-500 hover:text-indigo-400 text-sm transition-colors">Пользовательское соглашение</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}