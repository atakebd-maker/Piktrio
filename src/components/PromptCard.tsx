import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import { PromptItem } from '../types/prompt';
import { copyToClipboard } from '../utils/clipboard';

interface PromptCardProps {
  prompt: PromptItem;
  onViewDetails: (prompt: PromptItem) => void;
  onCopyPrompt: (promptText: string, promptId: string) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  onViewDetails,
  onCopyPrompt,
}) => {
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);

  const handleCopy = async (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation(); // Never open the image details page on copy!
    
    // Copy ONLY the complete English prompt text
    const success = await copyToClipboard(prompt.prompt);
    if (success) {
      onCopyPrompt(prompt.prompt, prompt.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleCardClick = () => {
    // If mobile overlay is shown, let clicking image open details
    onViewDetails(prompt);
  };

  const handleTouchCard = (e: React.TouchEvent) => {
    // On touch devices, reveal the Copy Prompt button overlay
    if (!mobileActive) {
      setMobileActive(true);
      setTimeout(() => setMobileActive(false), 4000);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      onTouchStart={handleTouchCard}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200/90 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* 
        IMAGE DISPLAY CONTAINER:
        Strict adherence to Image Display Rules:
        - Never crop uploaded images.
        - Never cut off any part of an image.
        - Preserve original aspect ratios.
        - Use object-fit: contain.
        - Allow natural image dimensions and heights.
      */}
      <div className="relative w-full bg-gray-950 flex items-center justify-center overflow-hidden min-h-[220px] sm:min-h-[280px]">
        
        {/* Soft background pattern */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:16px_16px]"
        />

        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-900 animate-pulse flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-gray-700 animate-spin" />
          </div>
        )}

        {/* 
          Original Uncropped Image
          Always object-contain and max-w-full
        */}
        <img
          src={prompt.imageUrl}
          alt={prompt.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{ objectFit: 'contain' }}
          className={`w-full h-auto max-h-[460px] object-contain transition-transform duration-300 group-hover:scale-[1.01] ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* BADGE: 📌 Pinned */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {prompt.isPinned && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-900/85 text-white backdrop-blur-md border border-gray-700/60 shadow-xs">
              <span>📌</span>
              <span>Pinned</span>
            </span>
          )}
        </div>

        {/* =========================================================
            HOVER-TO-COPY OVERLAY (Desktop & Mobile Touch)
            - Smooth overlay with beautiful blue Copy Prompt button
            - Never opens details on copy
            - Copies strictly the complete English prompt
            ========================================================= */}
        <div 
          className={`absolute inset-0 bg-gray-950/40 backdrop-blur-[2px] flex items-center justify-center p-3 transition-opacity duration-300 ${
            mobileActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xl transition-all duration-200 cursor-pointer transform active:scale-95 ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/40 hover:scale-105'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 animate-bounce" />
                <span>Prompt Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Prompt</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Subtle bottom info bar */}
      <div className="p-2.5 sm:p-3 bg-white border-t border-gray-100 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-gray-700 line-clamp-1">
          {prompt.title}
        </span>
        <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md font-medium shrink-0 ml-1">
          {prompt.category}
        </span>
      </div>

    </div>
  );
};
