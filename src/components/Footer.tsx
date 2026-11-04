import React from 'react';
import { Send, Smartphone } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (categoryName: string) => void;
}

const MENU_ITEMS = [
  { name: 'Home', action: 'All' },
  { name: 'About Us', action: 'about' },
  { name: 'Contact Us', action: 'contact' },
  { name: 'Privacy Policy', action: 'privacy' },
  { name: 'Terms & Conditions', action: 'terms' },
];

const COLLECTIONS_ITEMS = [
  { label: 'Diwali AI Photo Prompts', cat: 'Girls' },
  { label: 'Trending AI Photo Prompts', cat: 'Trending' },
  { label: 'Couple AI Photo Prompts', cat: 'Couple' },
  { label: 'AI Photo Prompts for Girls', cat: 'Girls' },
  { label: 'AI Photo Prompts for Boys', cat: 'Boys' },
  { label: 'Raksha Bandhan AI Photo Prompts', cat: 'Girls' },
  { label: 'Ganesh Chaturthi AI Photo Prompts', cat: 'Portraits' },
  { label: '1980s AI Photo Prompts', cat: 'Cinematic' },
  { label: 'Car AI Photo Prompts for Boys', cat: 'Boys' },
  { label: 'Birthday AI Photo Prompts', cat: 'Trending' },
  { label: 'Navratri AI Photo Prompts', cat: 'Girls' },
  { label: 'VN Template Code', cat: 'Templates' },
  { label: 'Trending CapCut Templates', cat: 'Templates' },
];

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16 pt-12 pb-10 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* SECTION 1: MENU */}
        <div className="mb-10">
          <h4 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
            MENU
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  if (item.action === 'All') {
                    onSelectCategory('All');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    alert(`${item.name} of Piktrio.`);
                  }
                }}
                className="px-4 py-2 rounded-full text-xs font-medium bg-blue-50/70 hover:bg-blue-100 text-blue-900 border border-blue-100 transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 2: COLLECTIONS */}
        <div className="mb-10">
          <h4 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
            COLLECTIONS
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {COLLECTIONS_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onSelectCategory(item.cat);
                  window.scrollTo({ top: 320, behavior: 'smooth' });
                }}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-blue-50/70 hover:bg-blue-100 text-blue-900 border border-blue-100 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 3: FOLLOW PIKTRIO */}
        <div className="mb-10">
          <h4 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
            FOLLOW PIKTRIO
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* Get the App */}
            <button
              onClick={() => alert('Piktrio Web App is available! Add to home screen in your browser options.')}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Get the App</span>
            </button>
          </div>
        </div>

        {/* SECTION 4: COPYRIGHT & DMCA */}
        <div className="pt-6 border-t border-gray-100 flex flex-col items-center gap-3 text-xs text-gray-400">
          <p className="max-w-xl text-center leading-relaxed">
            &copy; {new Date().getFullYear()} Piktrio. All rights reserved. All content on this site, including AI prompts, images, and articles, is protected by copyright law. Unauthorised reproduction or distribution is prohibited. &mdash;{' '}
            <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Terms</span> |{' '}
            <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Privacy</span>
          </p>

          {/* DMCA Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-900 text-white font-mono text-[10px] tracking-wider uppercase">
            <span className="text-emerald-400 font-bold">DMCA</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-200">PROTECTED</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
