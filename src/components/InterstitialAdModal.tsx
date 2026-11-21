import React, { useState, useEffect, useCallback } from 'react';
import { X, Clock, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { AdBanner } from './AdBanner';

interface InterstitialAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockSuccess: () => void;
}

export const InterstitialAdModal: React.FC<InterstitialAdModalProps> = ({
  isOpen,
  onClose,
  onUnlockSuccess,
}) => {
  // User Session Ad Countdown Rules:
  // Reset on leaving website and re-entering (new session): uses sessionStorage.
  // 1st photo click: 10 seconds
  // 2nd photo click: 5 seconds
  // 3rd photo click: 3 seconds
  // 4th photo click: 5 seconds
  // 5th photo click and every subsequent click: 6 seconds
  const getRequiredDuration = (): number => {
    try {
      const countStr = sessionStorage.getItem('piktrio_session_ad_click_count');
      const clickCount = countStr ? parseInt(countStr, 10) : 0;
      if (clickCount === 0) return 10; // 1st click: 10s
      if (clickCount === 1) return 5;  // 2nd click: 5s
      if (clickCount === 2) return 3;  // 3rd click: 3s
      if (clickCount === 3) return 5;  // 4th click: 5s
      return 6;                        // 5th click and subsequent clicks: 6s
    } catch {
      return 10;
    }
  };

  const [totalDuration, setTotalDuration] = useState<number>(10);
  const [countdown, setCountdown] = useState<number>(10);
  const [canClose, setCanClose] = useState<boolean>(false);
  const [slotStatuses, setSlotStatuses] = useState<[boolean, boolean]>([false, false]);
  const [isLoadingAds, setIsLoadingAds] = useState<boolean>(true);

  const handleSlotStatus = useCallback((index: 0 | 1, hasAd: boolean) => {
    setSlotStatuses((prev) => {
      if (prev[index] === hasAd) return prev;
      const next: [boolean, boolean] = [prev[0], prev[1]];
      next[index] = hasAd;
      return next;
    });
  }, []);

  const onSlotLarge = useCallback((v: boolean) => handleSlotStatus(0, v), [handleSlotStatus]);
  const onSlotSmall = useCallback((v: boolean) => handleSlotStatus(1, v), [handleSlotStatus]);

  // When modal is triggered on photo click, immediately start the countdown and load both ads
  useEffect(() => {
    if (isOpen) {
      const duration = getRequiredDuration();
      setTotalDuration(duration);
      setCountdown(duration);
      setCanClose(false);
      setSlotStatuses([false, false]);
      setIsLoadingAds(true);

      const loadDoneTimer = window.setTimeout(() => {
        setIsLoadingAds(false);
      }, 2800);
      return () => window.clearTimeout(loadDoneTimer);
    }
  }, [isOpen]);

  // Real-time countdown timer
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

  const handleCloseAndUnlock = () => {
    if (!canClose) return;
    try {
      const countStr = sessionStorage.getItem('piktrio_session_ad_click_count');
      const currentCount = countStr ? parseInt(countStr, 10) : 0;
      sessionStorage.setItem('piktrio_session_ad_click_count', (currentCount + 1).toString());
    } catch {
      // ignore
    }
    onUnlockSuccess();
    onClose();
  };

  if (!isOpen) return null;

  const anyAdLoaded = slotStatuses[0] || slotStatuses[1];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sponsored Advertisement"
      className="fixed inset-0 z-50 w-full h-full bg-white text-slate-800 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Top Full-Width Header + Progress */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-3.5 pb-3">
          <div className="w-full flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Sponsored Advertisement</span>
            </div>

            {/* Countdown Badge / Skip Ad Button */}
            {canClose ? (
              <button
                onClick={handleCloseAndUnlock}
                aria-label="Skip ad and view prompt"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md transform active:scale-95 animate-pulse"
                title="Skip Ad & View Full Prompt"
              >
                <span>Skip Ad</span>
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold shadow-2xs">
                <Clock className="w-3.5 h-3.5 animate-spin text-amber-600" />
                <span>Skip in {countdown}s</span>
              </div>
            )}
          </div>

          {/* Dynamic Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200">
            <div
              className={`h-full transition-all duration-1000 ease-linear rounded-full ${
                canClose ? 'bg-emerald-500 w-full' : 'bg-blue-600'
              }`}
              style={{ width: canClose ? '100%' : `${((totalDuration - countdown) / totalDuration) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Center Full-Screen Ad Area: Exactly 2 Ads (300x250 Large + 320x50 Small) */}
      <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center gap-5 px-4 py-6">
        {!anyAdLoaded && isLoadingAds && (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs sm:text-sm font-semibold text-slate-500">Loading sponsored advertisement...</p>
          </div>
        )}

        <AdBanner format="300x250" label="" className="my-0" priorityPrimary onStatusChange={onSlotLarge} />
        <AdBanner format="320x50" label="" className="my-0" priorityPrimary onStatusChange={onSlotSmall} />

        {!anyAdLoaded && !isLoadingAds && (
          <div className="w-full max-w-md rounded-2xl bg-slate-50 border border-slate-200 px-5 py-7 text-center">
            <Sparkles className="w-7 h-7 text-blue-600 mx-auto mb-2.5" />
            <p className="text-sm sm:text-base font-bold text-slate-800 mb-1">Preparing Your AI Prompt</p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Your prompt preview and copy guide are unlocking automatically.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Full-Width Status / Skip & Unlock Action */}
      <div className="w-full bg-white/95 backdrop-blur-md border-t border-slate-200 sticky bottom-0 z-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 text-center">
          {canClose ? (
            <div className="flex flex-col items-center gap-2.5">
              <p className="text-xs text-emerald-700 font-bold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ready! Click below to skip ad and view prompt.</span>
              </p>
              <button
                onClick={handleCloseAndUnlock}
                className="w-full max-w-md py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer transform active:scale-[0.99] transition-all"
              >
                <span>Skip Ad &amp; View Prompt</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-slate-500 font-medium py-1">
              You can skip this ad in <span className="font-bold text-slate-800">{countdown} seconds</span> to view full photo prompt details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
