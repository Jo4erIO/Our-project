import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiMoon,
  FiSun,
  FiUser,
  FiHeart,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiSmartphone,
  FiMonitor,
  FiLogIn,
  FiShoppingCart
} from 'react-icons/fi';
import { useTheme } from '@/context/ThemeContext';
import { useDevice } from '@/context/DeviceContext';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/authSlice';

interface RightPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RightPanel({ isOpen, onClose }: RightPanelProps) {
  const { theme, toggleTheme } = useTheme();
  const { deviceType, setDeviceType } = useDevice();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    onClose();
    navigate('/');
  };

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
                <h2 className="text-xl font-bold">Меню</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FiX size={20} />
                </button>
              </div>

              {token && (
                <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p className="font-medium">Привет, {user?.email}</p>
                </div>
              )}

              <div className="flex-grow overflow-y-auto">
                {/* Тема */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Тема</h3>
                  <div className="flex space-x-2">
                    <button
                      className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                        theme === 'light'
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={toggleTheme} // Исправлено: убрали аргумент
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
                      onClick={toggleTheme} // Исправлено: убрали аргумент
                    >
                      <FiMoon className="text-xl mb-1" />
                      <span>Темная</span>
                    </button>
                  </div>
                </div>

                {/* Вид устройства */}
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

                {/* Навигация */}
                <div className="space-y-1">
                  {!token ? (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={onClose}
                      >
                        <FiLogIn className="mr-3" />
                        <span>Вход</span>
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={onClose}
                      >
                        <FiUser className="mr-3" />
                        <span>Регистрация</span>
                      </Link>
                    </>
                  ) : (
                    <>
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
                        to="/cart"
                        className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={onClose}
                      >
                        <FiShoppingCart className="mr-3" />
                        <span>Корзина</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={onClose}
                      >
                        <FiSettings className="mr-3" />
                        <span>Настройки</span>
                      </Link>
                    </>
                  )}

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
                {token && (
                  <button
                    className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-red-500 dark:text-red-400"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="mr-3" />
                    <span>Выйти</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}