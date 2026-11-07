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
    <header className="sticky top-0 z-40 bg-[#0a0618]/95 backdrop-blur-md border-b border-[#21163e] shadow-lg shadow-black/40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* User's Website Logo */}
          <div 
            onClick={onHomeClick}
            className="flex items-center cursor-pointer select-none group py-1"
          >
            <img
              src="/assets/aistudio/1000050243-removebg-preview_62525162.png"
              alt="Piktrio"
              className="h-9 sm:h-11 md:h-12 w-auto max-w-[190px] sm:max-w-[240px] object-contain transition-transform group-hover:scale-[1.02] filter drop-shadow-[0_0_8px_rgba(255,255,255,0.45)] drop-shadow-[0_2px_12px_rgba(59,130,246,0.4)]"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={onHomeClick}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Home
            </button>

            <button
              onClick={() => onSelectCategory?.('Trending')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-pink-400 hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Trending</span>
            </button>

            <button
              onClick={() => onSelectCategory?.('Boys')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-purple-300 hover:bg-white/5 transition-colors cursor-pointer"
            >
              Boys & Men
            </button>

            <button
              onClick={() => onSelectCategory?.('Diwali AI photo editing prompt')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 transition-colors cursor-pointer"
            >
              Diwali Prompts
            </button>

            <button
              onClick={() => onSelectCategory?.('90s Retro AI Photo Prompts')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-purple-300 hover:bg-white/5 transition-colors cursor-pointer"
            >
              Retro 90s
            </button>

            <button
              onClick={() => onOpenModal?.('about')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Menu button on right (NO Open App button, as strictly requested) */}
          <button
            onClick={onOpenMenu}
            aria-label="Open menu"
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-gray-300 hover:text-white hover:bg-[#1a1238] border border-[#26184a] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="text-xs font-semibold text-gray-300 hidden sm:inline-block">Categories</span>
            <Menu className="w-5 h-5 stroke-[2]" />
          </button>

        </div>
      </div>
    </header>
  );
};
