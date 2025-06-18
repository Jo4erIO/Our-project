import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center group">
      <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform">
        <span className="text-white font-bold text-xl">T</span>
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        TechShop
      </span>
    </Link>
  );
}