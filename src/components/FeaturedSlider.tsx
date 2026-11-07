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

interface FeaturedSliderProps {
  prompts: PromptItem[];
  onSelectPrompt: (prompt: PromptItem) => void;
  onSelectCategory?: (categoryName: string) => void;
}

export const FeaturedSlider: React.FC<FeaturedSliderProps> = ({
  prompts,
  onSelectPrompt,
}) => {
  // Filter for all pinned prompts as requested
  const pinnedPrompts = useMemo(() => {
    const pinned = prompts.filter((p) => p.isPinned);
    return pinned.length > 0 ? pinned : prompts.slice(0, 6);
  }, [prompts]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Keep index within bounds if list length changes
  useEffect(() => {
    if (currentIndex >= pinnedPrompts.length) {
      setCurrentIndex(0);
    }
  }, [pinnedPrompts.length, currentIndex]);

  // Auto-advance every 5 seconds unless hovered/touched
  useEffect(() => {
    if (isPaused || pinnedPrompts.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pinnedPrompts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, pinnedPrompts.length]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? pinnedPrompts.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % pinnedPrompts.length);
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
      aria-label="Pinned Prompts Showcase"
      className="w-full my-4 select-none"
    >
      {/* Top Header Label */}
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-amber-500/15 text-amber-600 border border-amber-300/40">
            <Pin className="w-3.5 h-3.5 rotate-45" />
          </span>
          <h2 className="text-sm sm:text-base font-extrabold text-gray-900 tracking-tight flex items-center gap-1.5">
            <span>Pinned Featured Prompts</span>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
              Editor's Choice
            </span>
          </h2>
        </div>

        {/* Slide Counter & Arrows */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold text-gray-600">
            <span className="text-blue-600 font-bold">{currentIndex + 1}</span> / {pinnedPrompts.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              aria-label="Previous pinned photo"
              className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 flex items-center justify-center transition-colors cursor-pointer border border-gray-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next pinned photo"
              className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 flex items-center justify-center transition-colors cursor-pointer border border-gray-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Showcase Hero Card */}
      <div
        className="relative bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-white rounded-3xl overflow-hidden border border-gray-800 shadow-xl group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Subtle Ambient Background Blurred Glow from the current photo */}
        <div 
          className="absolute inset-0 opacity-20 filter blur-3xl scale-125 bg-cover bg-center pointer-events-none transition-all duration-700"
          style={{ backgroundImage: `url(${current.imageUrl})` }}
        />

        {/* Ambient Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center p-4 sm:p-6 md:p-8">
          
          {/* PHOTO SHOWCASE (Left on desktop, top on mobile) */}
          <div 
            onClick={() => onSelectPrompt(current)}
            className="md:col-span-5 lg:col-span-5 flex items-center justify-center cursor-pointer group/img relative"
          >
            <div className="relative w-full h-[240px] sm:h-[300px] md:h-[320px] bg-black/60 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center p-2">
              
              {/* Uncropped Image Display */}
              <img
                key={current.id}
                src={current.imageUrl}
                alt={current.title}
                style={{ objectFit: 'contain' }}
                className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 group-hover/img:scale-105"
              />

              {/* Pin Badge on Photo */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-amber-500/90 text-white backdrop-blur-md shadow-md border border-amber-300/40">
                <Pin className="w-3 h-3 rotate-45" />
                <span>Featured Pin</span>
              </div>

              {/* Quick View Overlay Trigger */}
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 text-white text-[10px] font-semibold backdrop-blur-md border border-white/20 opacity-0 group-hover/img:opacity-100 transition-opacity">
                <Maximize2 className="w-3 h-3" />
                <span>Open Post</span>
              </div>
            </div>
          </div>

          {/* SLIDE DETAILS & ACTION (Right on desktop, bottom on mobile) */}
          <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-between space-y-3 sm:space-y-4">
            
            {/* Category, Model & Pinned Tag */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span>{current.category}</span>
              </span>

              {current.model && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/10 text-gray-300 border border-white/10">
                  {current.model}
                </span>
              )}

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-400/30">
                📌 Pinned
              </span>
            </div>

            {/* Prompt Title */}
            <div>
              <h3 
                onClick={() => onSelectPrompt(current)}
                className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white leading-snug tracking-tight hover:text-blue-400 transition-colors cursor-pointer line-clamp-2"
              >
                {current.title}
              </h3>

              {/* Prompt snippet preview */}
              <p className="text-xs sm:text-sm text-gray-300 mt-2 line-clamp-2 leading-relaxed font-sans">
                {current.prompt}
              </p>
            </div>

            {/* Action Button & Navigation Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectPrompt(current)}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/40 transition-all transform active:scale-95 cursor-pointer"
              >
                <span>View Full Prompt & Copy</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-[11px] text-gray-400 hidden sm:inline-block">
                Includes 7-second copy countdown & ChatGPT / Gemini prompt
              </span>
            </div>

            {/* Dots Navigation */}
            <div className="flex items-center gap-1.5 pt-1">
              {pinnedPrompts.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx 
                      ? 'w-7 bg-blue-500 shadow-xs shadow-blue-400' 
                      : 'w-2 bg-white/30 hover:bg-white/60'
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
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-blue-600 text-white backdrop-blur-md hidden sm:flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer border border-white/20 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Desktop Next Slide Hover Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-blue-600 text-white backdrop-blur-md hidden sm:flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer border border-white/20 shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Horizontal Filmstrip Preview of all Pinned Photos */}
      {pinnedPrompts.length > 1 && (
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar scroll-smooth">
          {pinnedPrompts.map((p, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={p.id}
                onClick={() => setCurrentIndex(idx)}
                className={`flex-shrink-0 flex items-center gap-2 px-2.5 py-1.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 border-blue-400 shadow-xs ring-1 ring-blue-300'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-8 h-8 rounded-lg object-contain bg-gray-900 border border-gray-200"
                />
                <div className="flex flex-col max-w-[130px] sm:max-w-[160px]">
                  <span className={`text-[11px] font-bold line-clamp-1 ${isActive ? 'text-blue-700' : 'text-gray-800'}`}>
                    {p.title}
                  </span>
                  <span className="text-[9px] text-gray-500 font-medium">
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
