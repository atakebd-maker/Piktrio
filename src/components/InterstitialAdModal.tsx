import React, { useState, useEffect } from 'react';
import { X, Clock, Check, Sparkles } from 'lucide-react';
import { AdBanner } from './AdBanner';

interface InterstitialAdModalProps {
  onClose?: () => void;
}

export const InterstitialAdModal: React.FC<InterstitialAdModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(12); // 12-second countdown as requested (10-12s)
  const [canClose, setCanClose] = useState(false);

  // Trigger modal ~2.5 seconds after page entry
  useEffect(() => {
    const hasSeenAd = sessionStorage.getItem('piktrio_interstitial_seen');
    if (hasSeenAd) return;

    const showTimer = setTimeout(() => {
      setIsOpen(true);
    }, 2800);

    return () => clearTimeout(showTimer);
  }, []);

  // 12-second countdown timer
  useEffect(() => {
    if (!isOpen || canClose) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanClose(true);
    }
  }, [isOpen, countdown, canClose]);

  const handleClose = () => {
    if (!canClose) return;
    setIsOpen(false);
    sessionStorage.setItem('piktrio_interstitial_seen', 'true');
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-300">
      
      {/* Background overlay (clicking only allowed after countdown) */}
      <div 
        className="fixed inset-0" 
        onClick={() => {
          if (canClose) handleClose();
        }} 
      />

      {/* Center Modal Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-5 sm:p-6 border border-slate-200 z-10 flex flex-col items-center animate-in zoom-in-95 duration-200 text-slate-800">
        
        {/* Top Header Bar with Countdown & Close Button */}
        <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Special Sponsored Offer</span>
          </div>

          {/* Close button with Countdown Indicator */}
          {canClose ? (
            <button
              onClick={handleClose}
              aria-label="Close ad"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold transition-all cursor-pointer shadow-md transform active:scale-95 animate-pulse"
              title="Close Ad"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Close</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-[11px] font-bold shadow-xs">
              <Clock className="w-3.5 h-3.5 animate-spin text-amber-600" />
              <span>Wait {countdown}s</span>
            </div>
          )}
        </div>

        {/* Progress bar during 12-second countdown */}
        {!canClose && (
          <div className="w-full bg-slate-100 rounded-full h-1.5 mb-3 overflow-hidden border border-slate-200">
            <div
              className="bg-amber-500 h-full transition-all duration-1000 ease-linear rounded-full"
              style={{ width: `${((12 - countdown) / 12) * 100}%` }}
            />
          </div>
        )}

        {/* 300x250 BengalAds Banner */}
        <div className="w-full flex items-center justify-center my-1">
          <AdBanner format="300x250" label="" className="my-0" />
        </div>

        {/* Bottom Helper Info */}
        <div className="w-full pt-3 mt-2 border-t border-slate-100 text-center">
          {canClose ? (
            <p className="text-[11px] text-emerald-700 font-semibold flex items-center justify-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>You can now close this ad or click above.</span>
            </p>
          ) : (
            <p className="text-[11px] text-slate-400">
              Ad will be dismissible in {countdown} seconds &bull; Thank you for supporting Piktrio
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
