import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
      TechShop
    </Link>
  );
}