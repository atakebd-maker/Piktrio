import React from 'react';
import { Menu, Sparkles } from 'lucide-react';
import { ModalType } from './InfoModal';
import { CollectionInfo } from '../types/prompt';
import { COLLECTIONS_LIST } from '../data/initialPrompts';

interface HeaderProps {
  onOpenMenu: () => void;
  onHomeClick: () => void;
  onSelectCategory?: (categoryName: string) => void;
  onSelectCollection?: (collection: CollectionInfo) => void;
  onOpenModal?: (type: ModalType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onHomeClick,
  onSelectCategory,
  onSelectCollection,
  onOpenModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm shadow-slate-900/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* User's Website Logo (Enlarged and crisp on white header) */}
          <a 
            href="/"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                e.preventDefault();
                onHomeClick();
              }
            }}
            className="flex items-center cursor-pointer select-none group py-1.5 no-underline"
          >
            <img
              src="/assets/aistudio/1000050956-removebg-preview_1d3a3740.png"
              alt="Piktrio - Discover. Copy. Create."
              className="h-12 sm:h-14 md:h-16 w-auto max-w-[240px] sm:max-w-[300px] md:max-w-[340px] object-contain transition-transform group-hover:scale-[1.02]"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <a
              href="/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  onHomeClick();
                }
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer no-underline"
            >
              Home
            </a>

            <a
              href="/?category=trending"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  onSelectCategory?.('Trending');
                }
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer flex items-center gap-1.5 no-underline"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Trending</span>
            </a>

            <a
              href="/?category=boys"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  onSelectCategory?.('Boys');
                }
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition-colors cursor-pointer no-underline"
            >
              Boys &amp; Men
            </a>

            <a
              href="/collection/diwali-ai-photo-editing-prompt"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  if (onSelectCollection) {
                    onSelectCollection(COLLECTIONS_LIST[0]);
                  } else {
                    onSelectCategory?.('Diwali AI photo editing prompt');
                  }
                }
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 transition-colors cursor-pointer no-underline"
            >
              Diwali Prompts
            </a>

            <button
              onClick={() => onOpenModal?.('about')}
              className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Menu button on right (NO Open App button, as strictly requested) */}
          <button
            onClick={onOpenMenu}
            aria-label="Open menu"
            className="p-2 sm:px-3.5 sm:py-2 rounded-xl text-slate-800 hover:text-blue-600 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <span className="text-xs sm:text-sm font-bold text-slate-700 hidden sm:inline-block">Categories</span>
            <Menu className="w-5 h-5 stroke-[2] text-slate-800" />
          </button>

        </div>
      </div>
    </header>
  );
};
