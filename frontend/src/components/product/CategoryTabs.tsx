import { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'phones', name: 'Смартфоны' },
  { id: 'laptops', name: 'Ноутбуки' },
  { id: 'headphones', name: 'Наушники' },
  { id: 'tablets', name: 'Планшеты' },
  { id: 'wearables', name: 'Умные часы' },
  { id: 'cameras', name: 'Фототехника' },
];

export default function CategoryTabs() {
  const [activeCategory, setActiveCategory] = useState('phones');
  
  return (
    <div className="overflow-x-auto py-4">
      <div className="flex space-x-1 min-w-max">
        {categories.map(category => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className={`px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap ${
              activeCategory === category.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}