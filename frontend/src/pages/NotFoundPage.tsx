// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFoundPage() {
  return (
    <Container className="py-16 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-indigo-600 mb-4">404</h1>
        <h2 className="text-3xl font-medium mb-6">Страница не найдена</h2>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          К сожалению, страница, которую вы ищете, не существует или была перемещена.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Вернуться на главную
        </Link>
      </div>
    </Container>
  );
}