import React from 'react';
import { Search } from 'lucide-react';

interface HeroSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="pt-8 pb-4 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Centered Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-2">
        AI Photo Editing Prompts for ChatGPT & Gemini
      </h1>

      {/* Short Tagline / Description */}
      <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto mb-6 leading-relaxed">
        Discover. Copy. Create. Hand-curated viral prompts for portrait edits, festive celebrations, cinematic film stills, and trending aesthetic templates.
      </p>

      {/* Large Beautiful Search Bar (matching screenshots) */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative flex items-center bg-white border border-gray-300 rounded-full shadow-xs hover:border-blue-500 focus-within:border-blue-600 focus-within:ring-3 focus-within:ring-blue-100 transition-all p-1">
          <Search className="w-5 h-5 text-gray-400 ml-3.5 mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search prompts..."
            className="w-full py-2.5 px-1 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-xs text-gray-400 hover:text-gray-700 px-3 py-1 mr-1 rounded-full cursor-pointer hover:bg-gray-100"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
