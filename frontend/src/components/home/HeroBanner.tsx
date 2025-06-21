import { Link } from 'react-router-dom';

export default function HeroBanner() {
  return (
    <div className="hero-banner bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 mb-10 relative overflow-hidden">
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl font-bold text-white mb-4">
          Техника будущего уже сегодня!
        </h1>
        <p className="text-xl text-indigo-100 mb-8">
          Скидки до 30% на новейшие гаджеты. Ограниченное предложение.
        </p>
        <Link 
          to="/sale" 
          className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg hover:bg-indigo-50 transition-colors shadow-lg"
        >
          Смотреть акции
        </Link>
      </div>
      
      {/* Декоративные элементы */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-500/20 to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10"></div>
      <div className="absolute -bottom-32 -right-10 w-80 h-80 rounded-full bg-white/5"></div>
    </div>
  );
}