import { useState } from 'react';
import { FiMenu, FiSettings } from 'react-icons/fi';
import Container from '../ui/Container';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import SearchBar from './SearchBar';

export default function Header() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  return (
    <header className="header sticky top-0 z-50 min-h-[60px] bg-white dark:bg-gray-900 shadow-sm">
      <Container className="py-3">
        <div className="flex items-center justify-between">
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setLeftPanelOpen(true)}
          >
            <FiMenu size={24} className="text-gray-700 dark:text-gray-300" />
          </button>

          <div className="flex-1 mx-4">
            <SearchBar fullWidth />
          </div>

          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setRightPanelOpen(true)}
          >
            <FiSettings size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
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