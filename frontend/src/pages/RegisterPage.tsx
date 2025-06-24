import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import { register } from '@/api/authApi';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const repeatPassword = formData.get('repeatPassword') as string;

    // Валидация
    if (password !== repeatPassword) {
      setError('Пароли не совпадают');
      setIsLoading(false);
      return;
    }

    try {
      const response = await register(email, password);
      console.log('Registration success:', response);
      
      // Переход на страницу входа с подставленными данными
      navigate('/login', {
        state: {
          identifier: email,
          password: password
        }
      });
    } catch (err) {
      setError('Ошибка регистрации. Попробуйте другой email.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950">
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
        >
          <FaArrowLeft size={18} />
          <span>На главную</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Регистрация</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Создайте новый аккаунт
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="px-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                  placeholder="Ваш email"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="login" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Логин
                </label>
                <input
                  id="login"
                  name="login"
                  type="text"
                  required
                  className="px-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                  placeholder="Придумайте логин"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Пароль
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="px-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                  placeholder="Придумайте пароль"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="repeatPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Повторите пароль
                </label>
                <input
                  id="repeatPassword"
                  name="repeatPassword"
                  type="password"
                  required
                  className="px-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                  placeholder="Повторите пароль"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center py-2 px-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <span>Уже есть аккаунт? </span>
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
            >
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}