import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiShoppingCart, FiSun, FiMoon, FiHome, FiGrid } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { Link } from 'react-router-dom';

export default function RightPanel({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { theme, toggleTheme } = useTheme();
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/10 z-40" // Убрали блюр, оставили только затемнение
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 z-50 shadow-xl"
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Настройки</h2>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <FiX size={20} />
                </button>
              </div>

              <div className="mb-4">
                <button
                  onClick={toggleTheme}
                  className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {theme === 'light' ? (
                    <FiMoon className="mr-3 text-lg" />
                  ) : (
                    <FiSun className="mr-3 text-lg" />
                  )}
                  <span>{theme === 'light' ? 'Темная тема' : 'Светлая тема'}</span>
                </button>
              </div>

              <div className="mb-4">
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={onClose}
                    >
                      <FiUser className="mr-3 text-lg" />
                      <span>Профиль</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={onClose}
                    >
                      <FiHome className="mr-3 text-lg" />
                      <span>На главную</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category"
                      className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={onClose}
                    >
                      <FiGrid className="mr-3 text-lg" />
                      <span>Перейти в каталог</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <Link
                  to="/cart"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={onClose}
                >
                  <FiShoppingCart className="mr-3 text-lg" />
                  <span>Корзина</span>
                  {cartCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}