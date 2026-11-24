import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { PromptItem } from '../types/prompt';
import { AdBanner } from './AdBanner';

interface WelcomeSliderModalProps {
  isOpen: boolean;
  prompts: PromptItem[];
  onClose: () => void;
  onSelectPrompt: (prompt: PromptItem) => void;
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

export const WelcomeSliderModal: React.FC<WelcomeSliderModalProps> = ({
  isOpen,
  prompts,
  onClose,
  onSelectPrompt,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Strictly pick the 6 newest photos
  const newestSix = useMemo(() => {
    return [...prompts]
      .sort((a, b) => getPromptTimestamp(b) - getPromptTimestamp(a))
      .slice(0, 6);
  }, [prompts]);

  const scrollToSlide = (idx: number) => {
    const track = sliderRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>('[data-slide-card]');
    const targetCard = cards[idx];
    if (targetCard) {
      const targetLeft = targetCard.offsetLeft - track.offsetLeft;
      track.scrollTo({
        left: targetLeft,
        behavior: 'smooth',
      });
    }
    setActiveIndex(idx);
  };

  // Auto-advance one by one in a horizontal line like a live slider
  useEffect(() => {
    if (!isOpen || isPaused || newestSix.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % newestSix.length;
        const track = sliderRef.current;
        if (track) {
          const cards = track.querySelectorAll<HTMLElement>('[data-slide-card]');
          const targetCard = cards[next];
          if (targetCard) {
            const targetLeft = next === 0 ? 0 : targetCard.offsetLeft - track.offsetLeft;
            track.scrollTo({
              left: targetLeft,
              behavior: 'smooth',
            });
          }
        }
        return next;
      });
    }, 2600);

    return () => window.clearInterval(timer);
  }, [isOpen, isPaused, newestSix.length]);

  // Close cleanly on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || newestSix.length === 0) return null;

  const handlePrev = () => {
    const nextIdx = activeIndex === 0 ? newestSix.length - 1 : activeIndex - 1;
    scrollToSlide(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % newestSix.length;
    scrollToSlide(nextIdx);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Latest AI Photo Prompts"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="relative w-full max-w-2xl bg-white text-black rounded-2xl sm:rounded-3xl border border-neutral-300 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header with prominent top-right Cross (X) button */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-neutral-200 bg-white shrink-0">
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-extrabold text-black truncate">
              Latest AI Photo Prompts
            </h2>
            <p className="text-[11px] sm:text-xs text-neutral-500">
              Tap any photo to open prompt
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
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
            <button
              type="button"
              onClick={onClose}
              aria-label="Close popup"
              title="Close"
              className="w-9 h-9 rounded-xl bg-black hover:bg-neutral-800 text-white flex items-center justify-center transition-colors cursor-pointer ml-1 shadow-xs"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Scrollable Body: Single-Row 6-Photo Horizontal Slider + Natural Ads if available */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3">
          {/* 1-Line Horizontal Slider Track for the 6 Newest Photos */}
          <div
            ref={sliderRef}
            className="flex flex-nowrap items-stretch gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-1"
          >
            {newestSix.map((item, idx) => (
              <a
                key={item.id}
                data-slide-card
                href={`/prompt/${encodeURIComponent(item.id)}`}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    onClose();
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
          <div className="flex items-center justify-center gap-1.5">
            {newestSix.map((item, idx) => (
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

          {/* Ads render inside the popup automatically when served */}
          <div className="flex flex-col items-center justify-center gap-2">
            <AdBanner format="320x50" label="" priorityPrimary className="my-0" />
            <AdBanner format="300x250" label="" priorityPrimary className="my-0" />
          </div>
        </div>
      </div>
    </div>
  );
};
