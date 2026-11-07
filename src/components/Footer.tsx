import React from 'react';
import { COLLECTIONS_LIST } from '../data/initialPrompts';
import { ModalType } from './InfoModal';
import { Sparkles } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (categoryName: string) => void;
  onOpenModal?: (type: ModalType) => void;
}

const MENU_ITEMS: { name: string; type?: ModalType; isHome?: boolean }[] = [
  { name: 'Home', isHome: true },
  { name: 'About Us', type: 'about' },
  { name: 'Contact Us', type: 'contact' },
  { name: 'Privacy Policy', type: 'privacy' },
  { name: 'Terms & Conditions', type: 'terms' },
];

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenModal }) => {
  return (
    <footer className="bg-[#0a0618] border-t border-[#21163e] mt-16 pt-12 pb-10 text-center select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* SECTION 1: MENU */}
        <div className="mb-10">
          <h4 className="text-xs font-bold text-purple-300/60 tracking-widest uppercase mb-4">
            MENU
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  if (item.isHome) {
                    onSelectCategory('All');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (item.type) {
                    onOpenModal?.(item.type);
                  }
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#140e2f] hover:bg-[#1f1545] text-gray-200 hover:text-white border border-[#291b50] hover:border-pink-500/50 transition-all cursor-pointer shadow-xs"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 2: COLLECTIONS (Includes Diwali AI photo editing prompt) */}
        <div className="mb-10">
          <h4 className="text-xs font-bold text-purple-300/60 tracking-widest uppercase mb-4">
            COLLECTIONS
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto">
            {COLLECTIONS_LIST.map((item) => {
              const isDiwali = item.label.toLowerCase().includes('diwali');
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    onSelectCategory(item.cat);
                    window.scrollTo({ top: 260, behavior: 'smooth' });
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-xs ${
                    isDiwali
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-400/40 font-bold hover:bg-amber-500/25'
                      : 'bg-[#140e2f] hover:bg-[#1f1545] text-purple-200 hover:text-white border border-[#291b50] hover:border-purple-500/50'
                  }`}
                >
                  {isDiwali && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{item.label}</span>
                  {isDiwali && (
                    <span className="text-[9px] font-black uppercase bg-amber-500 text-black px-1.5 py-0.2 rounded-full">
                      Hot
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: COPYRIGHT */}
        <div className="pt-6 border-t border-[#1c1236] flex flex-col items-center gap-3 text-xs text-gray-400">
          <p className="max-w-xl text-center leading-relaxed">
            &copy; {new Date().getFullYear()} Piktrio. All rights reserved. Curated AI image prompts for ChatGPT &amp; Gemini. &mdash;{' '}
            <span
              onClick={() => onOpenModal?.('terms')}
              className="text-purple-300 hover:text-white cursor-pointer underline font-medium"
            >
              Terms
            </span> |{' '}
            <span
              onClick={() => onOpenModal?.('privacy')}
              className="text-purple-300 hover:text-white cursor-pointer underline font-medium"
            >
              Privacy
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
};
