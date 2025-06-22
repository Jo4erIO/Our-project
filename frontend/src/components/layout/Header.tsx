import { useState } from 'react';
import { FiMenu, FiShoppingCart, FiHeart, FiSettings, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Container from '@/components/ui/Container';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import SearchBar from './SearchBar';
import Logo from '@/components/ui/Logo';
import { useDevice } from '@/context/DeviceContext';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

export default function Header() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isMobile } = useDevice();
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);

  // Вычисляем количество товаров
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistItemsCount = wishlistItems.length;

  return (
    <header className="header sticky top-0 z-50 min-h-[60px] bg-white dark:bg-gray-900 shadow-sm">
      <Container className="py-3">
        <div className="flex items-center justify-between">
          {isMobile ? (
            <>
              <button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setLeftPanelOpen(true)}
              >
                <FiMenu size={24} className="text-gray-700 dark:text-gray-300" />
              </button>
              
              <div className="flex-grow mx-2">
                {searchOpen ? (
                  <SearchBar onClose={() => setSearchOpen(false)} />
                ) : (
                  <Logo />
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setSearchOpen(!searchOpen)}
                >
                  <FiSearch size={20} />
                </button>
                
                <Link
                  to="/wishlist"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                >
                  <FiHeart size={20} />
                  {wishlistItemsCount > 0 && (
                    <span className="cart-badge">{wishlistItemsCount}</span>
                  )}
                </Link>
                
                <Link
                  to="/cart"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                >
                  <FiShoppingCart size={20} />
                  {cartItemsCount > 0 && (
                    <span className="cart-badge">{cartItemsCount}</span>
                  )}
                </Link>
                
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setRightPanelOpen(true)}
                >
                  <FiSettings size={20} />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mr-2"
                  onClick={() => setLeftPanelOpen(true)}
                >
                  <FiMenu size={24} className="text-gray-700 dark:text-gray-300" />
                </button>
                <Logo />
              </div>
              
              <div className="flex-1 mx-8">
                <SearchBar fullWidth />
              </div>
              
              <div className="flex items-center space-x-4">
                <Link
                  to="/wishlist"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                >
                  <FiHeart size={24} />
                  {wishlistItemsCount > 0 && (
                    <span className="cart-badge">{wishlistItemsCount}</span>
                  )}
                </Link>
                
                <Link
                  to="/cart"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                >
                  <FiShoppingCart size={24} />
                  {cartItemsCount > 0 && (
                    <span className="cart-badge">{cartItemsCount}</span>
                  )}
                </Link>
                
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setRightPanelOpen(true)}
                >
                  <FiSettings size={24} className="text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </>
          )}
        </div>
      </Container>
      
      <LeftPanel
        isOpen={leftPanelOpen}
        onClose={() => setLeftPanelOpen(false)}
      />
      <RightPanel
        isOpen={rightPanelOpen}
        onClose={() => setRightPanelOpen(false)}
      />
    </header>
  );
}