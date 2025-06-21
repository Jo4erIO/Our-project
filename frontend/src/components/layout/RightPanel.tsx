// src/components/layout/RightPanel.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMoon, FiSun, FiUser, FiHeart, FiSettings, FiHelpCircle, FiLogOut, FiSmartphone, FiMonitor } from 'react-icons/fi';
import { useTheme } from '@/context/ThemeContext';
import { useDevice } from '@/context/DeviceContext';
import { Link } from 'react-router-dom';

interface RightPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RightPanel({ isOpen, onClose }: RightPanelProps) {
  const { theme, toggleTheme } = useTheme(); // Убрали неиспользуемую переменную
  const { deviceType, setDeviceType } = useDevice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/10 z-40"
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
            <div className="p-5 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Настройки</h2>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <FiX size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto">
                {/* Блок настройки темы */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Тема</h3>
                  <div className="flex space-x-2">
                    <button
                      className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                        theme === 'light'
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => toggleTheme()}
                    >
                      <FiSun className="text-xl mb-1" />
                      <span>Светлая</span>
                    </button>
                    <button
                      className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                        theme === 'dark'
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => toggleTheme()}
                    >
                      <FiMoon className="text-xl mb-1" />
                      <span>Темная</span>
                    </button>
                  </div>
                </div>

                {/* Блок настройки вида устройства */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Вид устройства</h3>
                  <div className="flex space-x-2">
                    <button
                      className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                        deviceType === 'mobile'
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setDeviceType('mobile')}
                    >
                      <FiSmartphone className="text-xl mb-1" />
                      <span>Мобильный</span>
                    </button>
                    <button
                      className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                        deviceType === 'desktop'
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setDeviceType('desktop')}
                    >
                      <FiMonitor className="text-xl mb-1" />
                      <span>Десктоп</span>
                    </button>
                  </div>
                </div>

                {/* Остальные настройки */}
                <div className="space-y-1">
                  <Link
                    to="/profile"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={onClose}
                  >
                    <FiUser className="mr-3" />
                    <span>Профиль</span>
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={onClose}
                  >
                    <FiHeart className="mr-3" />
                    <span>Избранное</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={onClose}
                  >
                    <FiSettings className="mr-3" />
                    <span>Настройки</span>
                  </Link>
                  <Link
                    to="/help"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={onClose}
                  >
                    <FiHelpCircle className="mr-3" />
                    <span>Помощь</span>
                  </Link>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <FiLogOut className="mr-3" />
                  <span>Выйти</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}