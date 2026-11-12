import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Pin,
  ArrowRight,
  Maximize2,
} from 'lucide-react';
import { PromptItem } from '../types/prompt';
import { ChatGptIcon, GeminiIcon } from './AiIcons';

interface FeaturedSliderProps {
  prompts: PromptItem[];
  onSelectPrompt: (prompt: PromptItem) => void;
  onSelectCategory?: (categoryName: string) => void;
}

export const FeaturedSlider: React.FC<FeaturedSliderProps> = ({
  prompts,
  onSelectPrompt,
}) => {
  // Aggregate all pinned prompts, sorted by newest timestamp first
  const pinnedPrompts = useMemo(() => {
    const getTimestamp = (p: PromptItem): number => {
      if (!p.createdAt) return 0;
      if (typeof p.createdAt === 'number') return p.createdAt;
      if (typeof p.createdAt === 'string') {
        const parsed = Date.parse(p.createdAt);
        return isNaN(parsed) ? 0 : parsed;
      }
      const anyCreated = p.createdAt as unknown as { toMillis?: () => number; seconds?: number };
      if (typeof anyCreated.toMillis === 'function') return anyCreated.toMillis();
      if (typeof anyCreated.seconds === 'number') return anyCreated.seconds * 1000;
      return 0;
    };
    const pinned = prompts
      .filter((p) => p.isPinned)
      .sort((a, b) => getTimestamp(b) - getTimestamp(a));
    return pinned.length > 0 ? pinned : prompts.slice(0, 6);
  }, [prompts]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Keep index within bounds
  useEffect(() => {
    if (currentIndex >= pinnedPrompts.length) {
      setCurrentIndex(0);
    }
  }, [pinnedPrompts.length, currentIndex]);

  const transitionTo = (newIndex: number) => {
    if (newIndex === currentIndex || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 240);
  };

  // Auto-advance every 6 seconds smoothly unless hovered/touched
  useEffect(() => {
    if (isPaused || pinnedPrompts.length <= 1) return;
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % pinnedPrompts.length);
        setIsTransitioning(false);
      }, 240);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, pinnedPrompts.length]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextIdx = currentIndex === 0 ? pinnedPrompts.length - 1 : currentIndex - 1;
    transitionTo(nextIdx);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextIdx = (currentIndex + 1) % pinnedPrompts.length;
    transitionTo(nextIdx);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  if (pinnedPrompts.length === 0) return null;

  const current = pinnedPrompts[currentIndex];

  return (
    <section 
      aria-label="Pinned Prompts Showcase Slider"
      className="w-full my-4 select-none"
    >
      {/* Top Header Label */}
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
            <Pin className="w-3.5 h-3.5 rotate-45" />
          </span>
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
            <span>Pinned Featured Prompts</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
              Editor's Choice
            </span>
          </h2>
        </div>

        {/* Slide Counter & Arrows */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold text-slate-500">
            <span className="text-blue-600 font-bold">{currentIndex + 1}</span> / {pinnedPrompts.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              aria-label="Previous pinned photo"
              className="w-7 h-7 rounded-lg bg-white hover:bg-slate-100 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next pinned photo"
              className="w-7 h-7 rounded-lg bg-white hover:bg-slate-100 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Showcase Hero Card with Generous Height so Full Image is 100% Uncropped */}
      <div
        className="relative bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-xl overflow-hidden group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        <div className={`relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center p-4 sm:p-6 md:p-8 transition-all duration-300 ease-in-out ${isTransitioning ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'}`}>
          
          {/* PHOTO SHOWCASE: Generous height so entire portrait image (head to toe) is 100% visible */}
          <a 
            href={`/?prompt=${encodeURIComponent(current.id)}`}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                e.preventDefault();
                onSelectPrompt(current);
              }
            }}
            className="md:col-span-6 lg:col-span-5 flex items-center justify-center cursor-pointer group/img relative no-underline block"
          >
            <div className="relative w-full h-[340px] sm:h-[400px] md:h-[450px] bg-slate-50 rounded-2xl border border-slate-200 shadow-inner flex items-center justify-center p-2.5 sm:p-3 overflow-hidden">
              
              {/* Uncropped Image Display: 100% full view from top to bottom */}
              <img
                src={current.imageUrl}
                alt={current.title}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/aistudio/1000050956-removebg-preview_1d3a3740.png';
                }}
                style={{ objectFit: 'contain' }}
                className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 group-hover/img:scale-[1.02]"
              />

              {/* Pin Badge on Photo */}
              <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-blue-600 text-white backdrop-blur-md shadow-md">
                <Pin className="w-3 h-3 rotate-45" />
                <span>Featured Pin</span>
              </div>

              {/* Quick View Trigger */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 text-white text-[10px] font-semibold backdrop-blur-md border border-white/20 opacity-0 group-hover/img:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Open Full Details</span>
              </div>
            </div>
          </a>

          {/* SLIDE DETAILS & ACTION */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-between space-y-3.5 sm:space-y-4">
            
            {/* Category, Model & Pinned Tag */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span>{current.category}</span>
              </span>

              {current.model && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 shadow-2xs">
                  <ChatGptIcon className="w-3 h-3 text-[#10a37f] shrink-0" />
                  <GeminiIcon className="w-3 h-3 text-blue-600 shrink-0" />
                  <span>{current.model}</span>
                </span>
              )}

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase bg-amber-50 text-amber-700 border border-amber-300">
                📌 Pinned
              </span>
            </div>

            {/* Prompt Title */}
            <div>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug tracking-tight hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
                <a
                  href={`/?prompt=${encodeURIComponent(current.id)}`}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                      e.preventDefault();
                      onSelectPrompt(current);
                    }
                  }}
                  className="hover:text-blue-600 text-inherit no-underline"
                >
                  {current.title}
                </a>
              </h3>

              {/* Prompt snippet preview */}
              <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed font-sans">
                {current.prompt}
              </p>
            </div>

            {/* Action Button & Navigation Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`/?prompt=${encodeURIComponent(current.id)}`}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    onSelectPrompt(current);
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all transform active:scale-95 cursor-pointer no-underline"
              >
                <span>View Full Prompt &amp; Copy</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <span className="text-[11px] text-slate-400 hidden sm:inline-block">
                Includes 7-second copy countdown &bull; 100% Uncropped Photo
              </span>
            </div>

            {/* Dots Navigation */}
            <div className="flex items-center gap-1.5 pt-2">
              {pinnedPrompts.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => transitionTo(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx 
                      ? 'w-7 bg-blue-600 shadow-xs shadow-blue-400' 
                      : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>

          </div>

        </div>

        {/* Desktop Previous Slide Hover Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-blue-600 hover:text-white text-slate-800 backdrop-blur-md hidden sm:flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer border border-slate-200 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Desktop Next Slide Hover Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-blue-600 hover:text-white text-slate-800 backdrop-blur-md hidden sm:flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer border border-slate-200 shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Horizontal Filmstrip Preview of all Pinned Photos (Full Aspect Ratio, Never Cropped) */}
      {pinnedPrompts.length > 1 && (
        <div className="mt-3 flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
          {pinnedPrompts.map((p, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={p.id}
                onClick={() => transitionTo(idx)}
                className={`flex-shrink-0 flex items-center gap-2 p-1.5 pr-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 border-blue-500 shadow-md shadow-blue-500/10 ring-1 ring-blue-500/50'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <div className="w-10 h-14 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center p-0.5">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/aistudio/1000050956-removebg-preview_1d3a3740.png';
                    }}
                    style={{ objectFit: 'contain' }}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                  />
                </div>
                <div className="flex flex-col max-w-[130px] sm:max-w-[170px]">
                  <span className={`text-[11px] font-bold line-clamp-1 ${isActive ? 'text-blue-700' : 'text-slate-800'}`}>
                    {p.title}
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium">
                    {p.category}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

    </section>
  );
};
