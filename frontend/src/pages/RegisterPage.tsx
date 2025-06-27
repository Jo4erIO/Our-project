import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';
import { register } from '@/api/authApi';
import { setCredentials } from '@/store/authSlice';

interface FormData {
  email: string;
  password: string;
  repeatPassword: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    repeatPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Валидация
      if (!formData.email || !formData.password || !formData.repeatPassword) {
        throw new Error('All fields are required');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      if (formData.password !== formData.repeatPassword) {
        throw new Error('Passwords do not match');
      }

      console.log('Sending registration request for:', formData.email);
      
      // Отправка данных
      const response = await register(formData.email, formData.password);
      
      console.log('Registration successful:', response);
      
      // Сохранение данных аутентификации
      dispatch(setCredentials({
        user: response.user,
        token: response.token
      }));

      // Перенаправление
      navigate('/');
    } catch (err: unknown) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err instanceof Error) {
        errorMessage = err.message;
        console.error('Registration error details:', err);
      } else {
        console.error('Unknown registration error:', err);
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="absolute top-6 left-6">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          <FaArrowLeft size={18} />
          <span>Back to home</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Fill in your details to register
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label htmlFor="repeatPassword" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Repeat Password
              </label>
              <input
                id="repeatPassword"
                name="repeatPassword"
                type="password"
                value={formData.repeatPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                  Registering...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}