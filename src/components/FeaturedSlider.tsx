import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

interface SlideItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  category: string;
  gradient: string;
  accentColor: string;
}

interface FeaturedSliderProps {
  onSelectCategory: (categoryName: string) => void;
}

const SLIDES: SlideItem[] = [
  {
    id: 'diwali',
    badge: 'Diwali Special',
    title: 'Diwali AI Photo Editing Prompts',
    subtitle: 'Golden glowing diyas, sparkling phooljhadi, vibrant fireworks & festive portraits.',
    category: 'Diwali AI photo editing prompt',
    gradient: 'from-amber-600 via-orange-600 to-amber-700',
    accentColor: 'bg-amber-400/30 text-amber-100',
  },
  {
    id: 'trending',
    badge: 'Trending Prompts',
    title: 'Viral AI Photo Editing Prompts',
    subtitle: 'High precision prompts tailored for ChatGPT, Gemini & Midjourney v6.',
    category: 'Trending',
    gradient: 'from-blue-600 via-indigo-600 to-blue-700',
    accentColor: 'bg-white/20 text-white',
  },
  {
    id: 'couple',
    badge: 'Couple Aesthetic',
    title: 'Cinematic & Romantic Couple Prompts',
    subtitle: 'Golden hour sunsets, festive outfits, and authentic emotion lighting.',
    category: 'Couple',
    gradient: 'from-sky-600 via-blue-600 to-indigo-700',
    accentColor: 'bg-white/20 text-white',
  },
  {
    id: 'boys',
    badge: 'Boys Collection',
    title: 'Urban Streetwear & Supercar Aesthetics',
    subtitle: 'Moody portraits, leather jacket styles, and neon city vibes.',
    category: 'Boys',
    gradient: 'from-slate-800 via-blue-900 to-indigo-900',
    accentColor: 'bg-blue-500/30 text-white',
  },
];

export const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ onSelectCategory }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-slide every 5 seconds unless hovered/paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
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

  const currentSlide = SLIDES[currentIndex];

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 my-4">
      <div
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm border border-blue-100 group select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Banner Slide Content */}
        <div
          className={`relative bg-gradient-to-r ${currentSlide.gradient} p-5 sm:p-8 md:p-10 text-white min-h-[170px] sm:min-h-[200px] md:min-h-[220px] flex flex-col justify-between transition-all duration-500`}
        >
          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />

          {/* Top Row: Badge + Category Indicator */}
          <div className="relative z-10 flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${currentSlide.accentColor}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentSlide.badge}</span>
            </span>
            <span className="text-[11px] font-mono text-white/70 uppercase tracking-widest hidden sm:inline-block">
              {currentIndex + 1} / {SLIDES.length}
            </span>
          </div>

          {/* Middle Row: Title & Subtitle */}
          <div className="relative z-10 my-3 max-w-2xl">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-1.5 leading-snug">
              {currentSlide.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/85 line-clamp-2 font-normal leading-relaxed">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Bottom Row: Action Button */}
          <div className="relative z-10 flex items-center justify-between pt-1">
            <button
              onClick={() => onSelectCategory(currentSlide.category)}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-white text-blue-900 text-xs sm:text-sm font-bold shadow-md hover:bg-blue-50 transition-all transform active:scale-95 cursor-pointer"
            >
              <span>Explore {currentSlide.category} Prompts</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Navigation Dots */}
            <div className="flex items-center gap-1.5">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Previous Slide Chevron */}
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer hidden sm:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Slide Chevron */}
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer hidden sm:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
