// src/components/layout/SearchBar.tsx
import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface Props {
  fullWidth?: boolean;
  onClose?: () => void;
}

export default function SearchBar({ fullWidth = false, onClose }: Props) {
  const [query, setQuery] = useState('');
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);
  };

  return (
    <form onSubmit={handleSearch} className={fullWidth ? 'w-full' : ''}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск телефонов, ноутбуков, аксессуаров..."
          className="w-full py-3 pl-4 pr-12 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          autoFocus={onClose !== undefined}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          <FiSearch size={20} />
        </button>
        {onClose && (
          <button
            type="button"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={onClose}
          >
            <FiX size={20} />
          </button>
        )}
      </div>
    </form>
  );
}