import React from 'react';
import { COLLECTIONS_LIST } from '../data/initialPrompts';
import { CollectionInfo } from '../types/prompt';
import { ModalType } from './InfoModal';
import { Sparkles } from 'lucide-react';
import { ChatGptIcon, GeminiIcon } from './AiIcons';

interface FooterProps {
  collections?: CollectionInfo[];
  onSelectCategory: (categoryName: string) => void;
  onSelectCollection: (collection: CollectionInfo) => void;
  onOpenModal?: (type: ModalType) => void;
}

const MENU_ITEMS: { name: string; type?: ModalType; isHome?: boolean }[] = [
  { name: 'Home', isHome: true },
  { name: 'About Us', type: 'about' },
  { name: 'Contact Us', type: 'contact' },
  { name: 'Privacy Policy', type: 'privacy' },
  { name: 'Terms & Conditions', type: 'terms' },
];

export const Footer: React.FC<FooterProps> = ({ collections = COLLECTIONS_LIST, onSelectCategory, onSelectCollection, onOpenModal }) => {
  return (
    <footer className="bg-white border-t border-neutral-200 mt-16 pt-12 pb-10 text-center select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* SECTION 1: MENU */}
        <div className="mb-10">
          <h4 className="text-xs font-bold text-neutral-500 tracking-widest uppercase mb-4">
            MENU
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  if (item.isHome) {
                    onSelectCategory('All');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (item.type) {
                    onOpenModal?.(item.type);
                  }
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-50 hover:bg-black text-black hover:text-white border border-neutral-200 hover:border-black transition-all cursor-pointer shadow-xs"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 2: COLLECTIONS (Triggers dedicated navigateToCollection page) */}
        <div className="mb-10">
          <h4 className="text-xs font-bold text-neutral-500 tracking-widest uppercase mb-4">
            COLLECTIONS
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
            {collections.map((item) => {
              const isDiwali = item.label.toLowerCase().includes('diwali');
              return (
                <a
                  key={item.slug}
                  href={`/collection/${encodeURIComponent(item.slug)}`}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                      e.preventDefault();
                      e.stopPropagation();
                      onSelectCollection(item);
                    }
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-xs no-underline ${
                    isDiwali
                      ? 'bg-black text-white border border-black font-bold hover:bg-neutral-800'
                      : 'bg-neutral-50 hover:bg-black text-black hover:text-white border border-neutral-200 hover:border-black'
                  }`}
                >
                  {isDiwali && <Sparkles className="w-3.5 h-3.5 text-white" />}
                  <span>{item.label}</span>
                  {isDiwali && (
                    <span className="text-[9px] font-black uppercase bg-white text-black px-1.5 py-0.2 rounded-full">
                      Hot
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: COPYRIGHT & AI MODEL BADGES */}
        <div className="pt-6 border-t border-neutral-200 flex flex-col items-center gap-3 text-xs text-neutral-500">
          <div className="flex items-center gap-2 text-neutral-700 font-medium">
            <span>Curated AI Image Prompts for</span>
            <span className="inline-flex items-center gap-1 font-bold text-black">
              <ChatGptIcon className="w-3.5 h-3.5 text-black" />
              <span>ChatGPT</span>
            </span>
            <span>&bull;</span>
            <span className="inline-flex items-center gap-1 font-bold text-black">
              <GeminiIcon className="w-3.5 h-3.5 text-black" />
              <span>Gemini</span>
            </span>
          </div>

          <p className="max-w-xl text-center leading-relaxed">
            &copy; {new Date().getFullYear()} Piktrio. All rights reserved. &mdash;{' '}
            <span
              onClick={() => onOpenModal?.('terms')}
              className="text-black hover:underline cursor-pointer font-semibold"
            >
              Terms
            </span> |{' '}
            <span
              onClick={() => onOpenModal?.('privacy')}
              className="text-black hover:underline cursor-pointer font-semibold"
            >
              Privacy
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
};
