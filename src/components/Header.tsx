import React from 'react';
import { Menu, Sparkles } from 'lucide-react';
import { ModalType } from './InfoModal';

interface HeaderProps {
  onOpenMenu: () => void;
  onHomeClick: () => void;
  onSelectCategory?: (categoryName: string) => void;
  onOpenModal?: (type: ModalType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onHomeClick,
  onSelectCategory,
  onOpenModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Prominent Logo on the left (Enlarged as requested) */}
          <div 
            onClick={onHomeClick}
            className="flex items-center cursor-pointer select-none group py-1"
          >
            <img
              src="/assets/aistudio/1000050243-removebg-preview_62525162.png"
              alt="Piktrio - Discover. Copy. Create."
              className="h-14 sm:h-18 md:h-20 w-auto max-w-[260px] sm:max-w-[340px] md:max-w-[400px] object-contain transition-transform group-hover:scale-[1.02]"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <button
              onClick={onHomeClick}
              className="px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 transition-colors cursor-pointer"
            >
              Home
            </button>

            {/* Glowing Diwali Special Collection Link */}
            <button
              onClick={() => onSelectCategory?.('Diwali AI photo editing prompt')}
              className="px-3.5 py-1.5 rounded-xl text-xs lg:text-sm font-bold bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/15 text-amber-800 border border-amber-300/80 hover:bg-amber-100/70 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Diwali Prompts</span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 bg-amber-600 text-white rounded-full">New</span>
            </button>

            <button
              onClick={() => onSelectCategory?.('Trending')}
              className="px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 transition-colors cursor-pointer"
            >
              Trending
            </button>

            <button
              onClick={() => onOpenModal?.('about')}
              className="px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 transition-colors cursor-pointer"
            >
              About Us
            </button>

            <button
              onClick={() => onOpenModal?.('contact')}
              className="px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </nav>

          {/* Hamburger Menu on the right */}
          <button
            onClick={onOpenMenu}
            aria-label="Open menu"
            className="p-2.5 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span className="text-xs font-semibold text-gray-500 hidden sm:inline-block">Menu</span>
            <Menu className="w-6 h-6 stroke-[2.2]" />
          </button>

        </div>
      </div>
    </header>
  );
};
