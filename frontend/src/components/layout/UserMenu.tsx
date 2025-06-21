import { useState } from 'react';
import { FiUser, FiHeart, FiLogIn, FiSettings, FiHelpCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  mobile?: boolean;
}

export default function UserMenu({ mobile = false }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`relative ${mobile ? '' : 'hidden md:block'}`}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`flex items-center ${
          mobile
            ? 'w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg'
            : 'p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800'
        } transition-colors`}
        aria-label="Меню пользователя"
      >
        <FiUser className={mobile ? "text-xl" : "text-lg"} />
        {mobile && <span className="ml-3">Профиль</span>}
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={`absolute ${
              mobile
                ? 'static w-full mt-2 space-y-1'
                : 'right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20 border border-gray-200 dark:border-gray-700'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center ${
                    mobile ? 'px-4 py-3' : 'px-4 py-2'
                  } text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiUser className="mr-2" />
                  Профиль
                </Link>
                <Link
                  to="/wishlist"
                  className={`flex items-center ${
                    mobile ? 'px-4 py-3' : 'px-4 py-2'
                  } text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiHeart className="mr-2" />
                  Избранное
                </Link>
                <Link
                  to="/settings"
                  className={`flex items-center ${
                    mobile ? 'px-4 py-3' : 'px-4 py-2'
                  } text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiSettings className="mr-2" />
                  Настройки
                </Link>
                {mobile && (
                  <Link
                    to="/help"
                    className={`flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiHelpCircle className="mr-2" />
                    Помощь
                  </Link>
                )}
                <div className={`${mobile ? 'border-t my-1' : 'border-t my-1'}`}></div>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left ${
                    mobile ? 'px-4 py-3' : 'px-4 py-2'
                  } text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  Выйти
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsLoggedIn(true);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center w-full ${
                  mobile ? 'px-4 py-3' : 'px-4 py-2'
                } text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <FiLogIn className="mr-2" />
                Войти / Регистрация
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}