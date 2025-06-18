import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export default function NavDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const categories = [
    'Смартфоны',
    'Ноутбуки',
    'Планшеты',
    'Наушники',
    'Умные часы',
    'Фототехника'
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
      >
        <span>Категории</span>
        <FiChevronDown className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 bg-white rounded-lg shadow-xl border">
          <div className="py-1">
            {categories.map((category, index) => (
              <a
                key={index}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}