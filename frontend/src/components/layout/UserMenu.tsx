import { useState } from 'react';
import { FiUser, FiHeart, FiLogIn, FiSettings, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/authSlice';

interface Props {
  mobile?: boolean;
}

export default function UserMenu({ mobile = false }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

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
        {mobile && <span className="ml-3">{token ? 'Профиль' : 'Вход/Регистрация'}</span>}
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
            {token ? (
              <>
                <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  {user?.email}
                </div>
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
                  to="/cart"
                  className={`flex items-center ${
                    mobile ? 'px-4 py-3' : 'px-4 py-2'
                  } text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiShoppingCart className="mr-2" />
                  Корзина
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
                <div className={`${mobile ? 'border-t my-1' : 'border-t my-1'}`}></div>
                <button
                  onClick={handleLogout}
                  className={`w-full text-left ${
                    mobile ? 'px-4 py-3' : 'px-4 py-2'
                  } text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`flex items-center ${
                    mobile ? 'px-4 py-3' : 'px-4 py-2'
                  } text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiLogIn className="mr-2" />
                  Вход
                </Link>
                <Link
                  to="/register"
                  className={`flex items-center ${
                    mobile ? 'px-4 py-3' : 'px-4 py-2'
                  } text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiUser className="mr-2" />
                  Регистрация
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}