import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onOpenMenu: () => void;
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMenu, onHomeClick }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo on the left (Background-removed logo) */}
          <div 
            onClick={onHomeClick}
            className="flex items-center cursor-pointer select-none group py-1"
          >
            <img
              src="/assets/aistudio/1000050243-removebg-preview_62525162.png"
              alt="Piktrio - TS Prompt Store"
              className="h-9 sm:h-11 w-auto max-w-[180px] sm:max-w-[220px] object-contain transition-transform group-hover:scale-[1.02]"
            />
          </div>

          {/* Hamburger Menu on the right */}
          <button
            onClick={onOpenMenu}
            aria-label="Open menu"
            className="p-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <Menu className="w-6 h-6 stroke-[2.2]" />
          </button>

        </div>
      </div>
    </header>
  );
};
