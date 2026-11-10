import React, { useState, useEffect } from 'react';
import { X, Play, Clock, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { AdBanner } from './AdBanner';

interface InterstitialAdModalProps {
  onClose?: () => void;
}

type ModalStage = 'prompt' | 'viewing_ad';

export const InterstitialAdModal: React.FC<InterstitialAdModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<ModalStage>('prompt');
  const [countdown, setCountdown] = useState(10); // 10-second ad countdown
  const [canClose, setCanClose] = useState(false);

  // Check if user already unlocked access within the last 24 hours
  useEffect(() => {
    try {
      const unlockedUntil = localStorage.getItem('piktrio_unlock_until');
      if (unlockedUntil && Number(unlockedUntil) > Date.now()) {
        return; // Still unlocked
      }
    } catch {
      // Fallback if localStorage is restricted
    }

    // Show popup after ~2 seconds of page entrance
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 10-second countdown when user is viewing the ad
  useEffect(() => {
    if (stage !== 'viewing_ad' || canClose) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanClose(true);
    }
  }, [stage, countdown, canClose]);

  const handleStartAd = () => {
    setStage('viewing_ad');
    setCountdown(10);
    setCanClose(false);
  };

  const handleClose = () => {
    if (!canClose) return;
    setIsOpen(false);
    try {
      // Grant 24 hours access
      const expireTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('piktrio_unlock_until', expireTime.toString());
      sessionStorage.setItem('piktrio_unlock_session', 'true');
    } catch {
      // Fallback
    }
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-300">
      
      {/* Background Overlay */}
      <div 
        className="fixed inset-0"
        onClick={() => {
          if (stage === 'viewing_ad' && canClose) {
            handleClose();
          }
        }}
      />

      {/* Main Modal Dialog Box */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-slate-200 z-10 flex flex-col items-center animate-in zoom-in-95 duration-200 text-slate-800">
        
        {stage === 'prompt' ? (
          /* ================= STEP 1: UNLOCK CONTENT SCREEN (Matches attached screenshot exactly) ================= */
          <div className="w-full flex flex-col items-center text-center">
            
            {/* Top Subtitle */}
            <p className="text-xs sm:text-sm font-medium text-slate-500 tracking-wide">
              Welcome to Piktrio
            </p>

            {/* Main Heading */}
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 mb-2 tracking-tight">
              Unlock more content
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed max-w-xs">
              Take action to continue accessing the content on this site
            </p>

            {/* Action Card Button (Matches the interactive option in screenshot) */}
            <button
              onClick={handleStartAd}
              className="w-full text-left border border-slate-200 hover:border-blue-500 bg-slate-50/70 hover:bg-blue-50/40 p-4 rounded-2xl flex items-center justify-between transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer group transform active:scale-[0.99]"
            >
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  View a short ad
                </span>
                <span className="text-xs text-slate-500 font-medium mt-0.5">
                  Site-wide access for 24 hours
                </span>
              </div>

              {/* Blue Circular Play Icon */}
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-blue-700 group-hover:scale-105 transition-all">
                <Play className="w-4 h-4 fill-white text-white ml-0.5" />
              </div>
            </button>

            {/* Security / Quality guarantee note */}
            <div className="mt-6 flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Free instant access &bull; 100% safe &amp; secure</span>
            </div>

          </div>
        ) : (
          /* ================= STEP 2: 10-SECOND AD VIEWING SCREEN ================= */
          <div className="w-full flex flex-col items-center">
            
            {/* Header with Title & Countdown / Close button */}
            <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Sponsored Partner</span>
              </div>

              {/* Countdown / Close Button */}
              {canClose ? (
                <button
                  onClick={handleClose}
                  aria-label="Close ad"
                  className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-md transform active:scale-95 animate-pulse"
                  title="Close Ad & Unlock Content"
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Close &amp; Unlock</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-[11px] font-bold shadow-xs">
                  <Clock className="w-3.5 h-3.5 animate-spin text-amber-600" />
                  <span>Wait {countdown}s</span>
                </div>
              )}
            </div>

            {/* 10-second Progress Bar */}
            {!canClose && (
              <div className="w-full bg-slate-100 rounded-full h-1.5 mb-3 overflow-hidden border border-slate-200">
                <div
                  className="bg-blue-600 h-full transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${((10 - countdown) / 10) * 100}%` }}
                />
              </div>
            )}

            {/* Center 300x250 BengalAds Ad Widget */}
            <div className="w-full flex items-center justify-center my-1">
              <AdBanner format="300x250" label="" className="my-0" />
            </div>

            {/* Bottom Status / Completion Notice */}
            <div className="w-full pt-3 mt-2 border-t border-slate-100 text-center">
              {canClose ? (
                <div className="flex flex-col items-center gap-1">
                  <p className="text-xs text-emerald-700 font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Access Unlocked! Click 'Close &amp; Unlock' above.</span>
                  </p>
                </div>
              ) : (
                <p className="text-[11px] text-slate-400">
                  Please wait {countdown} seconds to unlock 24-hour site-wide access &bull; Thank you for supporting Piktrio
                </p>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
