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
          
          {/* Brand Logo & Wordmark matching AIPROMPTS.BUZZ style */}
          <div 
            onClick={onHomeClick}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group py-1"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 p-0.5 shadow-md shadow-purple-900/30">
              <div className="w-full h-full bg-[#0d0922] rounded-[10px] flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/aistudio/image_bad50ca2.png"
                  alt="Piktrio"
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain transition-transform group-hover:scale-110"
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="text-lg sm:text-2xl font-black tracking-tight text-white flex items-center leading-none">
                <span className="tracking-tight uppercase">PIKTRIO</span>
                <span className="text-pink-500 font-extrabold uppercase">.BUZZ</span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-medium text-purple-300/70 tracking-wider uppercase hidden sm:block">
                AI Photo Prompts &bull; Boys &bull; Festival &bull; Retro
              </span>
            </div>
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
