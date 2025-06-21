import { useState } from 'react';

interface Props {
  title: string;
  items: string[];
}

export default function CategoryColumn({ title, items }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="category-column bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 
        className="font-bold text-lg mb-4 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className="md:hidden">{isOpen ? '−' : '+'}</span>
      </h3>
      
      <ul className={`${isOpen ? 'block' : 'hidden'} md:block space-y-2`}>
        {items.map((item, index) => (
          <li key={index}>
            <a 
              href="#" 
              className="text-gray-700 hover:text-indigo-600 transition-colors block py-1"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}