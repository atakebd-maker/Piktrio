import React, { useState, useEffect, useRef } from 'react';
import { Search, Copy, Check, Sparkles } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';
import { ChatGptIcon, GeminiIcon } from './AiIcons';

interface HeroSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onTagClick?: (tag: string) => void;
  onCopySuccess?: (msg: string) => void;
}

interface TypingPromptItem {
  id: string;
  tagNum: string;
  category: string;
  filename: string;
  text: string;
}

const TYPING_PROMPTS: TypingPromptItem[] = [
  {
    id: 'editorial-magazine',
    tagNum: '#482',
    category: 'Boys Editorial',
    filename: 'piktrio.boys.prompt',
    text: 'cinematic poster portrait, dramatic red rim light, 35mm film grain, editorial fashion pose, bold AJMAL magazine cover typography, high-contrast studio realism',
  },
  {
    id: 'pink-roses',
    tagNum: '#483',
    category: 'Romantic Portrait',
    filename: 'roses_bluesky.prompt',
    text: 'cinematic portrait of a young man holding delicate pink blooming roses bouquet against clear azure blue sky, fluffy white clouds, warm golden-hour rim lighting',
  },
  {
    id: 'diwali-royal',
    tagNum: '#484',
    category: 'Diwali Royal',
    filename: 'royal_sherwani.prompt',
    text: 'ultra-realistic 4K royal festive portrait, navy blue sherwani with antique gold embroidery, palace courtyard with glowing clay diyas and lanterns at dusk',
  },
  {
    id: 'blue-pixel-stretch',
    tagNum: '#485',
    category: 'Pixel Stretch Art',
    filename: 'pixel_stretch.prompt',
    text: 'avant-garde cinematic digital portrait, dramatic sapphire blue pixel-stretch trails, back profile angle, atmospheric neon rim lighting, 8K album art',
  },
  {
    id: 'wildflower-paradise',
    tagNum: '#486',
    category: 'Wildflower Meadow',
    filename: 'wildflower_golden.prompt',
    text: 'cinematic portrait immersed in a blooming wildflower meadow, golden hour sunset rays, relaxed linen shirt, lens flares, razor-sharp 85mm f/1.4 clarity',
  },
  {
    id: 'water-lilies-boat',
    tagNum: '#487',
    category: 'Water Lilies',
    filename: 'water_lilies_lake.prompt',
    text: 'enchanting portrait on a traditional wooden boat floating across calm lake filled with blooming purple water lilies, crystal reflections, sapphire blue sky',
  },
];

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  onSearchChange,
  onTagClick,
  onCopySuccess,
}) => {
  // Typing Animation State
  const [promptIndex, setPromptIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const currentPrompt = TYPING_PROMPTS[promptIndex];

  // Natural Typing Animation Effect
  useEffect(() => {
    const fullText = currentPrompt.text;
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText === fullText) {
      // Pause at full text so visitor can read it comfortably
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 3200);
    } else if (isDeleting && displayedText === '') {
      // Switch to next prompt after completely deleting
      setIsDeleting(false);
      setPromptIndex((prev) => (prev + 1) % TYPING_PROMPTS.length);
      timeout = setTimeout(() => {}, 400);
    } else {
      // Typing forward or deleting backward
      const speed = isDeleting ? 14 : 32;
      timeout = setTimeout(() => {
        setDisplayedText((prev) =>
          isDeleting
            ? fullText.substring(0, prev.length - 1)
            : fullText.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentPrompt.text]);

  const handleCopyTerminal = async () => {
    const success = await copyToClipboard(currentPrompt.text);
    if (success) {
      setIsCopied(true);
      onCopySuccess?.('Prompt copied from terminal!');
      setTimeout(() => setIsCopied(false), 2200);
    }
  };

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
      
      {/* 1. Pill Badge matching Screenshot 1 */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider text-amber-700 bg-amber-50 border border-amber-300/80 uppercase mb-4 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
        <span>1000+ PROMPTS &bull; UPDATED DAILY</span>
      </div>

      {/* 2. Bold High-Impact Headline matching Screenshot */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.08] mb-3">
        <span>COPY. PASTE.</span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600">
          GO VIRAL.
        </span>
      </h1>

      {/* 3. Subtitle description */}
      <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed mb-5 font-normal">
        Ready-made <strong className="text-slate-900 font-bold">Gemini &amp; ChatGPT AI</strong> photo prompts &mdash; boys, royal diwali &amp; cinematic styles. Tap copy, paste into Gemini, done.
      </p>

      {/* 4. Filter Action Pills (Gemini AI Prompts / ChatGPT Prompts) */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
        <button
          onClick={() => {
            onSearchChange('Gemini');
            onTagClick?.('Trending');
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-all transform active:scale-95 cursor-pointer"
        >
          <GeminiIcon className="w-4 h-4 shrink-0" />
          <span>Gemini AI Prompts</span>
        </button>

        <button
          onClick={() => {
            onSearchChange('ChatGPT');
            onTagClick?.('Trending');
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-emerald-700 border border-slate-300 text-xs sm:text-sm font-bold shadow-xs transition-all transform active:scale-95 cursor-pointer"
        >
          <ChatGptIcon className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>ChatGPT Prompts</span>
        </button>
      </div>

      {/* 5. INTERACTIVE TERMINAL PROMPT BOX WITH LIVE TYPING ANIMATION (Matching Screenshot) */}
      <div className="relative max-w-2xl mx-auto mb-6 text-left select-text">
        {/* Ambient Gradient Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 via-purple-600/20 to-blue-600/30 rounded-3xl blur-md pointer-events-none" />

        {/* The Card */}
        <div className="relative bg-[#0d1326] text-slate-100 rounded-2xl sm:rounded-3xl border border-[#1e2947] shadow-2xl p-4 sm:p-5 md:p-6 overflow-hidden font-mono">
          
          {/* Top Window Bar: Red/Yellow/Green Dots + Filename */}
          <div className="flex items-center justify-between pb-3 sm:pb-3.5 border-b border-slate-800/80 mb-3 sm:mb-4 select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block shadow-xs shadow-red-500/50" />
              <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block shadow-xs shadow-amber-500/50" />
              <span className="w-3 h-3 rounded-full bg-[#10b981] inline-block shadow-xs shadow-emerald-500/50" />
            </div>

            <span className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-wider">
              {currentPrompt.filename}
            </span>
          </div>

          {/* Typing Area with Animated Cursor */}
          <div className="min-h-[76px] sm:min-h-[88px] md:min-h-[96px] flex items-start py-1">
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-slate-100 font-mono tracking-wide selection:bg-blue-600 selection:text-white">
              <span>{displayedText}</span>
              <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-gradient-to-b from-pink-500 to-purple-500 ml-1 animate-pulse align-middle" />
            </p>
          </div>

          {/* Bottom Bar: Prompt Tag + Copy Button */}
          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-800/80 mt-2 select-none">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-400 font-mono">
              <span className="text-slate-500">{currentPrompt.tagNum}</span>
              <span>&bull;</span>
              <span className="text-blue-400 font-semibold">{currentPrompt.category}</span>
            </div>

            <button
              onClick={handleCopyTerminal}
              aria-label="Copy prompt from terminal"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all transform active:scale-95 cursor-pointer shadow-md ${
                isCopied
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 hover:from-pink-400 hover:to-blue-500 text-white shadow-blue-500/25 hover:scale-[1.03]'
              }`}
            >
              {isCopied ? (
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
      </div>

      {/* 6. Quick Copy-Paste Search Pills matching Screenshot */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto mb-6">
        <button
          onClick={() => onSearchChange('gemini ai photo prompt copy paste')}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all cursor-pointer shadow-xs"
        >
          <GeminiIcon className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span>gemini ai photo prompt copy paste</span>
        </button>
        <button
          onClick={() => onSearchChange('chatgpt ai photo editing prompt')}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 transition-all cursor-pointer shadow-xs"
        >
          <ChatGptIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>chatgpt ai photo editing prompt</span>
        </button>
      </div>

      {/* 7. Sleek White & Blue Search Bar */}
      <div className="relative max-w-xl mx-auto mb-3">
        <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-lg shadow-blue-500/5 focus-within:border-blue-500 focus-within:ring-3 focus-within:ring-blue-100 transition-all p-1">
          <Search className="w-5 h-5 text-slate-400 ml-3.5 mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search prompts (e.g. diwali, sherwani, scorpio, roses, ajmal)..."
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

      {/* 8. Clean Prompt Quick Tags */}
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
