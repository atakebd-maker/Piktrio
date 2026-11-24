import React, { useState, useEffect, useCallback } from 'react';
import { Search, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';
import { ChatGptIcon, GeminiIcon } from './AiIcons';
import { SearchHistory } from './SearchHistory';

const SEARCH_HISTORY_STORAGE_KEY = 'piktrio_search_history';
const MAX_SEARCH_HISTORY = 5;

const loadSearchHistory = (): string[] => {
  try {
    const raw = localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
      .slice(0, MAX_SEARCH_HISTORY);
  } catch {
    return [];
  }
};

const persistSearchHistory = (items: string[]) => {
  try {
    localStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage quota or private browsing errors
  }
};

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
  const [searchHistory, setSearchHistory] = useState<string[]>(() => loadSearchHistory());

  const saveQueryToHistory = useCallback((rawQuery: string) => {
    const trimmed = rawQuery.trim();
    if (trimmed.length < 2) return;
    setSearchHistory((prev) => {
      const next = [
        trimmed,
        ...prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase()),
      ].slice(0, MAX_SEARCH_HISTORY);
      persistSearchHistory(next);
      return next;
    });
  }, []);

  // Debounced auto-save when user pauses after typing a query
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (trimmed.length < 2) return;
    const timer = setTimeout(() => {
      saveQueryToHistory(trimmed);
    }, 900);
    return () => clearTimeout(timer);
  }, [searchQuery, saveQueryToHistory]);

  const handleSelectWithHistory = (query: string) => {
    onSearchChange(query);
    saveQueryToHistory(query);
  };

  const handleRemoveHistoryItem = (query: string) => {
    setSearchHistory((prev) => {
      const next = prev.filter((item) => item.toLowerCase() !== query.toLowerCase());
      persistSearchHistory(next);
      return next;
    });
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    persistSearchHistory([]);
  };

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
      
      {/* 1. Original Pulsing Live Label */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider text-amber-800 bg-amber-50 border border-amber-200 uppercase mb-4 shadow-xs">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <span>1000+ PROMPTS &bull; UPDATED DAILY</span>
      </div>

      {/* 2. Bold High-Impact Headline (White & Black Base + Refined Indigo-Blue Accent) */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-zinc-950 leading-[1.08] mb-3">
        <span>COPY. PASTE.</span>
        <br />
        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          GO VIRAL.
        </span>
      </h1>

      {/* 3. Subtitle description */}
      <p className="text-xs sm:text-sm md:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed mb-5 font-normal">
        Ready-made <strong className="text-zinc-950 font-bold">Gemini &amp; ChatGPT AI</strong> photo prompts &mdash; boys, royal diwali &amp; cinematic styles. Tap copy, paste into Gemini, done.
      </p>

      {/* 4. Filter Action Buttons with Authentic Colored AI Icons */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
        <button
          onClick={() => {
            handleSelectWithHistory('Gemini');
            onTagClick?.('Trending');
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold shadow-md shadow-zinc-900/15 transition-all transform active:scale-95 cursor-pointer border border-zinc-800"
        >
          <GeminiIcon className="w-4 h-4 shrink-0" />
          <span>Gemini AI Prompts</span>
        </button>

        <button
          onClick={() => {
            handleSelectWithHistory('ChatGPT');
            onTagClick?.('Trending');
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200 hover:border-blue-500/60 text-xs sm:text-sm font-bold shadow-xs transition-all transform active:scale-95 cursor-pointer"
        >
          <ChatGptIcon className="w-4 h-4 shrink-0" />
          <span>ChatGPT Prompts</span>
        </button>
      </div>

      {/* 5. INTERACTIVE TERMINAL PROMPT BOX WITH LIVE TYPING ANIMATION (Original Colors Preserved) */}
      <div className="relative max-w-2xl mx-auto mb-6 text-left select-text">
        {/* Ambient Colored Depth Behind Terminal */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-indigo-500/20 to-purple-600/20 rounded-3xl blur-lg pointer-events-none" />

        {/* The Terminal Card */}
        <div className="relative bg-[#0d1326] text-slate-100 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl p-4 sm:p-5 md:p-6 overflow-hidden font-mono">
          
          {/* Top Window Bar: Classic Colored Window Dots + Filename */}
          <div className="flex items-center justify-between pb-3 sm:pb-3.5 border-b border-slate-800/80 mb-3 sm:mb-4 select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block shadow-xs" />
            </div>

            <span className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-wider">
              {currentPrompt.filename}
            </span>
          </div>

          {/* Typing Area with Original Animated Blue Cursor */}
          <div className="min-h-[76px] sm:min-h-[88px] md:min-h-[96px] flex items-start py-1">
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-slate-100 font-mono tracking-wide selection:bg-blue-500 selection:text-white">
              <span>{displayedText}</span>
              <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-blue-400 ml-1 animate-pulse align-middle rounded-xs" />
            </p>
          </div>

          {/* Bottom Bar: Prompt Tag + Copy Button */}
          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-800/80 mt-2 select-none">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-400 font-mono">
              <span className="text-amber-400 font-semibold">{currentPrompt.tagNum}</span>
              <span>&bull;</span>
              <span className="text-blue-400 font-semibold">{currentPrompt.category}</span>
            </div>

            <button
              onClick={handleCopyTerminal}
              aria-label="Copy prompt from terminal"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all transform active:scale-95 cursor-pointer shadow-md ${
                isCopied
                  ? 'bg-emerald-500 text-white border border-emerald-400/50'
                  : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-[1.03]'
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

      {/* 6. Quick Copy-Paste Search Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto mb-6">
        <button
          onClick={() => handleSelectWithHistory('gemini ai photo prompt copy paste')}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-medium text-zinc-700 bg-white border border-zinc-200 hover:border-blue-500/60 hover:text-zinc-950 hover:bg-blue-50/40 transition-all cursor-pointer shadow-xs"
        >
          <GeminiIcon className="w-3.5 h-3.5 shrink-0" />
          <span>gemini ai photo prompt copy paste</span>
        </button>
        <button
          onClick={() => handleSelectWithHistory('chatgpt ai photo editing prompt')}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-medium text-zinc-700 bg-white border border-zinc-200 hover:border-emerald-500/60 hover:text-zinc-950 hover:bg-emerald-50/40 transition-all cursor-pointer shadow-xs"
        >
          <ChatGptIcon className="w-3.5 h-3.5 shrink-0" />
          <span>chatgpt ai photo editing prompt</span>
        </button>
      </div>

      {/* 7. Sleek Search Bar (White & Black Base with Indigo Focus Ring) */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveQueryToHistory(searchQuery);
        }}
        className="relative max-w-xl mx-auto mb-3"
      >
        <div className="relative flex items-center bg-white border border-zinc-200 rounded-2xl shadow-lg shadow-zinc-900/5 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-600/10 transition-all p-1">
          <Search className="w-5 h-5 text-zinc-400 ml-3.5 mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onBlur={() => saveQueryToHistory(searchQuery)}
            placeholder="Search prompts (e.g. diwali, sherwani, scorpio, roses, ajmal)..."
            className="w-full py-2.5 px-1 text-xs sm:text-sm text-zinc-950 placeholder:text-zinc-400 bg-transparent focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="text-xs text-zinc-500 hover:text-zinc-950 px-3 py-1 mr-1 rounded-lg cursor-pointer hover:bg-zinc-100"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {/* 8. Search History Tags (Last 5 queries saved in localStorage) */}
      <SearchHistory
        queries={searchHistory}
        activeQuery={searchQuery}
        onSelectQuery={handleSelectWithHistory}
        onRemoveQuery={handleRemoveHistoryItem}
        onClearHistory={handleClearHistory}
      />

      {/* 9. Clean Prompt Quick Tags */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-2xl mx-auto">
        {QUICK_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => handleSelectWithHistory(tag)}
            className="px-3 py-1 rounded-full text-[11px] font-medium text-zinc-700 bg-white border border-zinc-200 hover:border-blue-500/60 hover:bg-zinc-900 hover:text-white transition-all cursor-pointer shadow-xs"
          >
            #{tag}
          </button>
        ))}
      </div>

    </div>
  );
};
