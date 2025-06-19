// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFoundPage() {
  return (
    <Container className="flex items-center justify-center min-h-screen">
      <div className="notfound-content">
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Страница не найдена</h2>
        <p className="notfound-message">
          К сожалению, страница, которую вы ищете, не существует или была перемещена.
        </p>
        <Link 
          to="/" 
          className="home-button"
        >
          <FiArrowLeft className="mr-2" />
          Вернуться на главную
        </Link>
      </div>
    </Container>
  );
}