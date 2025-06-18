import { useState } from 'react';
import { FiUser, FiHeart, FiLogIn } from 'react-icons/fi';

export default function UserMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center p-2 rounded-full hover:bg-gray-100"
      >
        <FiUser size={20} />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
          {isLoggedIn ? (
            <>
              <a 
                href="#" 
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
              >
                <FiUser className="mr-2" />
                Профиль
              </a>
              <a 
                href="#" 
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
              >
                <FiHeart className="mr-2" />
                Избранное
              </a>
              <div className="border-t my-1"></div>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
              >
                Выйти
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
            >
              <FiLogIn className="mr-2" />
              Войти / Регистрация
            </button>
          )}
        </div>
      )}
    </div>
  );
}