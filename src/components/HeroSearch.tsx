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
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/30 uppercase mb-4 shadow-xs shadow-amber-500/10">
        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
        <span>DISCOVER &bull; COPY &bull; CREATE &bull; 100% UNCROPPED</span>
      </div>

      {/* 2. Headline */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight mb-3">
        <span>AI PHOTO EDITING PROMPTS</span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400">
          FOR CHATGPT &amp; GEMINI
        </span>
      </h1>

      {/* 3. Subtitle description */}
      <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
        Handcrafted realistic prompts for boys, royal Diwali celebrations &amp; realistic portraits. Tap copy, paste into Gemini or ChatGPT, done.
      </p>

      {/* 4. Sleek Dark Search Bar */}
      <div className="relative max-w-xl mx-auto mb-3">
        <div className="relative flex items-center bg-[#140e2f] border border-[#2c1c54] rounded-2xl shadow-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all p-1">
          <Search className="w-5 h-5 text-gray-400 ml-3.5 mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search prompts (e.g. diwali, sherwani, scorpio, jailer 2)..."
            className="w-full py-2.5 px-1 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 bg-transparent focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-xs text-gray-400 hover:text-white px-3 py-1 mr-1 rounded-lg cursor-pointer hover:bg-white/10"
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
            className="px-3 py-1 rounded-full text-[11px] font-medium text-gray-300 bg-[#160f33] border border-[#2b1d52] hover:border-blue-400/60 hover:text-white transition-all cursor-pointer"
          >
            #{tag}
          </button>
        ))}
      </div>

    </div>
  );
};
