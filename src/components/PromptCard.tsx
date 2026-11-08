import React, { useState } from 'react';
import { Copy, Sparkles } from 'lucide-react';
import { PromptItem } from '../types/prompt';

interface PromptCardProps {
  prompt: PromptItem;
  onViewDetails: (prompt: PromptItem) => void;
  onCopyPrompt?: (promptText: string, promptId: string) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  onViewDetails,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCopy = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    // Open dedicated post page so user sees ads and completes 7-second countdown
    onViewDetails(prompt);
  };

  const handleCardClick = () => {
    onViewDetails(prompt);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col cursor-pointer overflow-hidden"
    >
      {/* 
        TITLE & CATEGORY HEADER (PLACED ABOVE THE IMAGE AS REQUESTED)
      */}
      <div className="p-2 sm:p-3 bg-white border-b border-slate-100 flex items-start justify-between gap-1.5 sm:gap-2 z-10 min-h-[44px] sm:min-h-[50px]">
        <h3 className="text-[11px] sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
          {prompt.title}
        </h3>
        <span className="text-[9px] sm:text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 sm:px-2 py-0.5 rounded-md shrink-0 mt-0.5">
          {prompt.category}
        </span>
      </div>

      {/* 
        IMAGE DISPLAY CONTAINER (BELOW TITLE):
        Strict adherence to Image Display Rules:
        - NEVER crop any uploaded image (zero cropping).
        - NEVER cut off any part of the image (head, legs, clothing fully visible).
        - Preserve original 100% aspect ratio with object-fit: contain.
        - Generous min-height and auto height to allow full vertical portrait display.
      */}
      <div className="relative w-full bg-slate-50 flex items-center justify-center p-1.5 sm:p-2.5 min-h-[200px] sm:min-h-[280px]">
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-blue-400 animate-spin" />
          </div>
        )}

        {/* 
          100% Uncropped Image
          Always object-contain with max-w-full and h-auto to show whole photograph
        */}
        <img
          src={prompt.imageUrl}
          alt={prompt.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{ objectFit: 'contain' }}
          className={`w-full h-auto max-h-[540px] object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.01] ${
            imageLoaded ? 'opacity-100' : 'opacity-90'
          }`}
        />

        {/* BADGE: 📌 Pinned */}
        {prompt.isPinned && (
          <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-amber-700 backdrop-blur-md border border-amber-300 shadow-sm">
              <span>📌</span>
              <span>Pinned</span>
            </span>
          </div>
        )}

        {/* HOVER-TO-COPY OVERLAY FOR DESKTOP */}
        <div 
          className="absolute inset-0 bg-slate-950/30 backdrop-blur-[2px] rounded-xl hidden sm:flex items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xl transition-all duration-200 cursor-pointer transform active:scale-95 bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 hover:scale-105"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Prompt</span>
          </button>
        </div>

      </div>

      {/* MOBILE & DESKTOP CARD BOTTOM BAR */}
      <div className="px-2.5 py-2 sm:px-3 sm:py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-1.5 mt-auto">
        <span className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">
          {prompt.model || 'ChatGPT / Gemini'}
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-xs cursor-pointer shrink-0"
        >
          <Copy className="w-3 h-3" />
          <span>Copy</span>
        </button>
      </div>

    </div>
  );
};
