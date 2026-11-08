import React from 'react';
import { Search } from 'lucide-react';

interface HeroSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onTagClick?: (tag: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const QUICK_TAGS = [
    'Diwali prompt for boys',
    'Royal Sherwani',
    'Courtyard Diya lighting',
    'Sparkler Fireworks',
    'Mahindra Scorpio',
    'Jailer 2',
  ];

  return (
    <div className="pt-8 sm:pt-12 pb-6 px-4 max-w-4xl mx-auto text-center select-none">
      
      {/* 1. Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider text-blue-700 bg-blue-50 border border-blue-200 uppercase mb-4 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
        <span>DISCOVER &bull; COPY &bull; CREATE &bull; 100% UNCROPPED</span>
      </div>

      {/* 2. Headline */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight mb-3">
        <span>AI PHOTO EDITING PROMPTS</span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">
          FOR CHATGPT &amp; GEMINI
        </span>
      </h1>

      {/* 3. Subtitle description */}
      <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
        Handcrafted realistic prompts for boys, royal Diwali celebrations &amp; realistic portraits. Tap copy, paste into Gemini or ChatGPT, done.
      </p>

      {/* 4. Sleek White & Blue Search Bar */}
      <div className="relative max-w-xl mx-auto mb-3">
        <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-lg shadow-blue-500/5 focus-within:border-blue-500 focus-within:ring-3 focus-within:ring-blue-100 transition-all p-1">
          <Search className="w-5 h-5 text-slate-400 ml-3.5 mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search prompts (e.g. diwali, sherwani, scorpio, jailer 2)..."
            className="w-full py-2.5 px-1 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-xs text-slate-400 hover:text-slate-700 px-3 py-1 mr-1 rounded-lg cursor-pointer hover:bg-slate-100"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* 5. Clean Prompt Quick Tags */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-2xl mx-auto">
        {QUICK_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => onSearchChange(tag)}
            className="px-3 py-1 rounded-full text-[11px] font-medium text-slate-600 bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all cursor-pointer shadow-xs"
          >
            #{tag}
          </button>
        ))}
      </div>

    </div>
  );
};
