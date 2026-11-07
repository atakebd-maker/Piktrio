import React, { useState } from 'react';
import { Search, Copy, Check, Terminal, Sparkles } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface HeroSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onTagClick?: (tag: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  onSearchChange,
  onTagClick,
}) => {
  const [terminalCopied, setTerminalCopied] = useState(false);

  const samplePrompt = "cinematic poster portrait, dramatic red rim light, 35mm film grain, editorial royal fashion pose";

  const handleCopyTerminal = async () => {
    const success = await copyToClipboard(samplePrompt);
    if (success) {
      setTerminalCopied(true);
      setTimeout(() => setTerminalCopied(false), 2200);
    }
  };

  const QUICK_TAGS = [
    'gemini ai photo prompt copy paste',
    'chatgpt ai photo prompt',
    'diwali prompt for boys',
    '90s retro motorcycle',
    'luxury car photoshoot',
  ];

  return (
    <div className="pt-8 sm:pt-12 pb-6 px-4 max-w-4xl mx-auto text-center select-none">
      
      {/* 1. Pill Badge matching screenshot 2: • 1000+ PROMPTS • UPDATED DAILY */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/30 uppercase mb-5 shadow-xs shadow-amber-500/10">
        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
        <span>1000+ PROMPTS &bull; UPDATED DAILY</span>
      </div>

      {/* 2. Giant Headline: COPY. PASTE. GO VIRAL. */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none uppercase mb-4">
        <span>COPY. PASTE.</span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300">
          GO VIRAL.
        </span>
      </h1>

      {/* 3. Subtitle description */}
      <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed mb-4 font-normal">
        Ready-made <strong className="text-white font-semibold">Gemini & ChatGPT AI photo prompts</strong> &mdash; boys, diwali festive, retro &amp; aesthetic styles. Tap copy, paste into Gemini, done.
      </p>

      {/* 4. Filter Button Pill */}
      <div className="inline-flex items-center justify-center mb-6">
        <button
          onClick={() => onTagClick?.('Boys')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-600/30 border border-blue-400/40 transition-transform active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-200" />
          <span>Gemini &amp; ChatGPT AI Prompts</span>
        </button>
      </div>

      {/* 5. Interactive Mac-Style Terminal Card matching screenshot 2 */}
      <div className="max-w-xl mx-auto mb-6 text-left bg-[#120c29] border border-[#2b1b50] rounded-2xl shadow-2xl overflow-hidden shadow-purple-950/40">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e0921] border-b border-[#231542]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-[11px] font-mono text-purple-300/60 flex items-center gap-1">
            <Terminal className="w-3 h-3" />
            <span>boys_festive.prompt</span>
          </span>
        </div>

        {/* Terminal Body with cursor */}
        <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-purple-100/90 leading-relaxed min-h-[76px]">
          <span>{samplePrompt}</span>
          <span className="inline-block w-2 h-4 bg-pink-500 ml-1.5 animate-pulse align-middle"></span>
        </div>

        {/* Terminal Footer with Copy Button */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d0820] border-t border-[#231542]">
          <span className="text-[11px] font-mono text-gray-400">
            #482 &bull; Gemini / GPT-4o
          </span>
          <button
            onClick={handleCopyTerminal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md ${
              terminalCopied
                ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white shadow-pink-500/25 active:scale-95'
            }`}
          >
            {terminalCopied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* 6. Sleek Dark Search Bar */}
      <div className="relative max-w-xl mx-auto mb-4">
        <div className="relative flex items-center bg-[#140e2f] border border-[#2c1c54] rounded-2xl shadow-lg focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-500/20 transition-all p-1">
          <Search className="w-5 h-5 text-gray-400 ml-3.5 mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search prompts (e.g. diwali, sherwani, retro, scorpio)..."
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

      {/* 7. Quick Tags below search */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
        {QUICK_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => onSearchChange(tag)}
            className="px-3 py-1 rounded-full text-[11px] font-medium text-gray-300 bg-[#160f33] border border-[#2b1d52] hover:border-pink-500/50 hover:text-white transition-all cursor-pointer"
          >
            {tag}
          </button>
        ))}
      </div>

    </div>
  );
};
