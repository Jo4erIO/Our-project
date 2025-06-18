// src/components/layout/Header.tsx
import { useState } from 'react';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import SearchBar from './SearchBar';
import NavDropdown from './NavDropdown';
import UserMenu from './UserMenu';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { Link } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = useSelector((state: RootState) => 
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <Container className="py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center w-full md:w-auto justify-between">
            <Logo />
            <button 
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
          
          <div className="w-full md:max-w-xl">
            <SearchBar />
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <UserMenu />
            <Link 
              to="/cart" 
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center mt-4 space-x-6">
          <NavDropdown />
          <Link to="/new" className="text-gray-700 hover:text-indigo-600 transition-colors">Новинки</Link>
          <Link to="/sale" className="text-gray-700 hover:text-indigo-600 transition-colors">Акции</Link>
          <Link to="/brands" className="text-gray-700 hover:text-indigo-600 transition-colors">Бренды</Link>
          <Link to="/delivery" className="text-gray-700 hover:text-indigo-600 transition-colors">Доставка</Link>
        </nav>
      </Container>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <Container>
            <div className="mb-4">
              <SearchBar />
            </div>
            <nav className="grid grid-cols-2 gap-2">
              <Link to="/phones" className="py-2 px-4 rounded hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Смартфоны</Link>
              <Link to="/laptops" className="py-2 px-4 rounded hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Ноутбуки</Link>
              <Link to="/tablets" className="py-2 px-4 rounded hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Планшеты</Link>
              <Link to="/headphones" className="py-2 px-4 rounded hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Наушники</Link>
              <Link to="/sale" className="py-2 px-4 rounded hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Акции</Link>
              <Link to="/brands" className="py-2 px-4 rounded hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Бренды</Link>
            </nav>
            <div className="flex items-center space-x-4 mt-4">
              <UserMenu />
              <Link 
                to="/cart" 
                className="p-2 rounded-full hover:bg-gray-100 relative"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}