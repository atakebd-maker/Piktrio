import React from 'react';

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
  { label: 'Trending AI Photo Prompts', cat: 'Trending' },
  { label: 'Couple AI Photo Prompts', cat: 'Couple' },
  { label: 'AI Photo Prompts for Boys', cat: 'Boys' },
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
                className="px-4 py-2 rounded-full text-xs font-medium bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-100 transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 2: COLLECTIONS (Strictly Boys, Girls, Couple, Trending) */}
        <div className="mb-10">
          <h4 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
            COLLECTIONS
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto">
            {COLLECTIONS_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onSelectCategory(item.cat);
                  window.scrollTo({ top: 260, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-full text-xs font-medium bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-100 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 3: COPYRIGHT */}
        <div className="pt-6 border-t border-gray-100 flex flex-col items-center gap-3 text-xs text-gray-400">
          <p className="max-w-xl text-center leading-relaxed">
            &copy; {new Date().getFullYear()} Piktrio. All rights reserved. All content on this site, including AI prompts and images, is protected by copyright law. Unauthorised reproduction or distribution is prohibited. &mdash;{' '}
            <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Terms</span> |{' '}
            <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Privacy</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
