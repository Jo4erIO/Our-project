import { FormEvent, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const data = new FormData(e.currentTarget);
    console.log({
      identifier: data.get('identifier'),
      password: data.get('password'),
    });

    // Имитация запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* ... остальные поля формы ... */}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Вход...</span>
          </>
        ) : (
          'Войти'
        )}
      </button>
    </form>
  );
}