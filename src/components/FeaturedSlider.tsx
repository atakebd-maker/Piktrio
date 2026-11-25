import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pin,
  ArrowUpRight,
} from 'lucide-react';
import { PromptItem } from '../types/prompt';

interface FeaturedSliderProps {
  prompts: PromptItem[];
  onSelectPrompt: (prompt: PromptItem) => void;
  onSelectCategory?: (categoryName: string) => void;
}

const getPromptTimestamp = (p: PromptItem): number => {
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

export const FeaturedSlider: React.FC<FeaturedSliderProps> = ({
  prompts,
  onSelectPrompt,
}) => {
  // Pinned prompts sorted newest first (fallback to newest prompts)
  const sliderPrompts = useMemo(() => {
    const pinned = prompts
      .filter((p) => p.isPinned)
      .sort((a, b) => getPromptTimestamp(b) - getPromptTimestamp(a));
    if (pinned.length > 0) return pinned.slice(0, 16);
    return [...prompts]
      .sort((a, b) => getPromptTimestamp(b) - getPromptTimestamp(a))
      .slice(0, 16);
  }, [prompts]);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Keep index within bounds
  useEffect(() => {
    if (activeIndex >= sliderPrompts.length) {
      setActiveIndex(0);
    }
  }, [sliderPrompts.length, activeIndex]);

  const scrollTrackToIndex = (track: HTMLDivElement, idx: number) => {
    const cards = track.querySelectorAll<HTMLElement>('[data-featured-slide-card]');
    const targetCard = cards[idx];
    if (!targetCard) return;
    const targetLeft =
      idx === 0
        ? 0
        : targetCard.getBoundingClientRect().left -
          track.getBoundingClientRect().left +
          track.scrollLeft;
    track.scrollTo({
      left: targetLeft,
      behavior: 'smooth',
    });
  };

  const scrollToSlide = (idx: number) => {
    const track = sliderRef.current;
    if (track) {
      scrollTrackToIndex(track, idx);
    }
    setActiveIndex(idx);
  };

  // Auto-advance one by one in a horizontal line like the popup slider
  useEffect(() => {
    if (isPaused || sliderPrompts.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % sliderPrompts.length;
        const track = sliderRef.current;
        if (track) {
          scrollTrackToIndex(track, next);
        }
        return next;
      });
    }, 2600);
    return () => window.clearInterval(timer);
  }, [isPaused, sliderPrompts.length]);

  const handlePrev = () => {
    const nextIdx = activeIndex === 0 ? sliderPrompts.length - 1 : activeIndex - 1;
    scrollToSlide(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % sliderPrompts.length;
    scrollToSlide(nextIdx);
  };

  if (sliderPrompts.length === 0) return null;

  return (
    <section
      aria-label="Pinned Prompts Showcase Slider"
      className="w-full my-4 select-none"
    >
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="bg-white text-black rounded-2xl sm:rounded-3xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        {/* Top Header matching the popup slider style */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-neutral-200 bg-white">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-900 text-amber-400 border border-zinc-800 shrink-0 shadow-xs">
              <Pin className="w-3.5 h-3.5 rotate-45" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-extrabold text-black truncate">
                  Pinned Featured Prompts
                </h2>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block shrink-0">
                  Editor&apos;s Choice
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-500">
                Tap any photo to open prompt
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-mono font-semibold text-neutral-500 mr-1 hidden sm:inline-block">
              <span className="text-black font-bold">{activeIndex + 1}</span> / {sliderPrompts.length}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-black flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-black flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Single-Row Horizontal Slider Track */}
        <div className="p-3.5 sm:p-5 space-y-3">
          <div
            ref={sliderRef}
            className="flex flex-nowrap items-stretch gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-1"
          >
            {sliderPrompts.map((item, idx) => (
              <a
                key={item.id}
                data-featured-slide-card
                href={`/?prompt=${encodeURIComponent(item.id)}`}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    onSelectPrompt(item);
                  }
                }}
                className={`snap-start shrink-0 w-[160px] sm:w-[192px] bg-white rounded-2xl border transition-all duration-200 flex flex-col overflow-hidden cursor-pointer no-underline group ${
                  activeIndex === idx
                    ? 'border-black shadow-md'
                    : 'border-neutral-200 hover:border-black hover:shadow-md'
                }`}
              >
                <div className="relative w-full h-[195px] sm:h-[225px] bg-neutral-50 flex items-center justify-center p-1.5 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        '/assets/aistudio/1000050956-removebg-preview_1d3a3740.png';
                    }}
                    style={{ objectFit: 'contain' }}
                    className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  {item.isPinned && (
                    <span className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-zinc-900/90 text-white shadow-xs">
                      <Pin className="w-2.5 h-2.5 rotate-45 text-amber-400" />
                      <span>Pinned</span>
                    </span>
                  )}
                </div>
                <div className="p-2.5 border-t border-neutral-200 flex flex-col justify-between gap-1.5 flex-1">
                  <h3 className="text-[11px] sm:text-xs font-bold text-black line-clamp-2 leading-snug group-hover:underline transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-[10px] text-neutral-500 font-medium pt-0.5">
                    <span className="truncate">{item.category}</span>
                    <span className="inline-flex items-center gap-0.5 text-black font-bold shrink-0">
                      <span>Open</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Slider Step Dots */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {sliderPrompts.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  activeIndex === idx
                    ? 'w-5 bg-black'
                    : 'w-1.5 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
