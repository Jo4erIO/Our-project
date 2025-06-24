import { FormEvent } from 'react';

export default function RegisterForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      repeatPassword: data.get('repeatPassword'),
      login: data.get('login'),
    });
  };

  return (
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
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
            placeholder="Введите ваш email"
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
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
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
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
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
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
            placeholder="Повторите пароль"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
      >
        Зарегистрироваться
      </button>
    </form>
  );
}