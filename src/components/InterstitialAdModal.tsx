import React, { useState, useEffect, useCallback } from 'react';
import { X, Clock, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { AdBanner } from './AdBanner';

interface InterstitialAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockSuccess: () => void;
}

const TOTAL_AD_SLOTS = 7;

export const InterstitialAdModal: React.FC<InterstitialAdModalProps> = ({
  isOpen,
  onClose,
  onUnlockSuccess,
}) => {
  // User Session Ad Countdown Cycle:
  // 1st click: 10s
  // 2nd click: 5s
  // 3rd click: 2s
  // 4th click: 10s (cycle repeats every 3 clicks)
  const getRequiredDuration = (): number => {
    try {
      const countStr = sessionStorage.getItem('piktrio_session_ad_click_count');
      const clickCount = countStr ? parseInt(countStr, 10) : 0;
      const step = isNaN(clickCount) ? 0 : clickCount % 3;
      if (step === 0) return 10; // 1st, 4th, 7th... -> 10s
      if (step === 1) return 5;  // 2nd, 5th, 8th... -> 5s
      return 2;                  // 3rd, 6th, 9th... -> 2s
    } catch {
      return 10;
    }
  };

  const [totalDuration, setTotalDuration] = useState<number>(10);
  const [countdown, setCountdown] = useState<number>(10);
  const [canClose, setCanClose] = useState<boolean>(false);
  const [slotStatuses, setSlotStatuses] = useState<boolean[]>(() =>
    Array(TOTAL_AD_SLOTS).fill(false)
  );
  const [isLoadingAds, setIsLoadingAds] = useState<boolean>(true);

  const handleSlotStatus = useCallback((index: number, hasAd: boolean) => {
    setSlotStatuses((prev) => {
      if (prev[index] === hasAd) return prev;
      const next = [...prev];
      next[index] = hasAd;
      return next;
    });
  }, []);

  const onSlot0 = useCallback((v: boolean) => handleSlotStatus(0, v), [handleSlotStatus]);
  const onSlot1 = useCallback((v: boolean) => handleSlotStatus(1, v), [handleSlotStatus]);
  const onSlot2 = useCallback((v: boolean) => handleSlotStatus(2, v), [handleSlotStatus]);
  const onSlot3 = useCallback((v: boolean) => handleSlotStatus(3, v), [handleSlotStatus]);
  const onSlot4 = useCallback((v: boolean) => handleSlotStatus(4, v), [handleSlotStatus]);
  const onSlot5 = useCallback((v: boolean) => handleSlotStatus(5, v), [handleSlotStatus]);
  const onSlot6 = useCallback((v: boolean) => handleSlotStatus(6, v), [handleSlotStatus]);

  // Reset timer and ad slot state whenever opened
  useEffect(() => {
    if (isOpen) {
      const duration = getRequiredDuration();
      setTotalDuration(duration);
      setCountdown(duration);
      setCanClose(false);
      setSlotStatuses(Array(TOTAL_AD_SLOTS).fill(false));
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
      const safeCount = isNaN(currentCount) ? 0 : currentCount;
      sessionStorage.setItem('piktrio_session_ad_click_count', (safeCount + 1).toString());
    } catch {
      // ignore storage errors
    }
    onUnlockSuccess();
    onClose();
  };

  if (!isOpen) return null;

  const anyAdLoaded = slotStatuses.some(Boolean);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sponsored Advertisement"
      className="fixed inset-0 z-50 w-full h-full bg-[#fafafa] text-zinc-950 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Top Sticky Header with Countdown & Skip Button */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-3.5 pb-3">
          <div className="w-full flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-950">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Sponsored Advertisement</span>
            </div>

            {canClose ? (
              <button
                onClick={handleCloseAndUnlock}
                aria-label="Skip ad and view prompt"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md shadow-emerald-600/20 transform active:scale-95 animate-pulse"
                title="Skip Ad & View Full Prompt"
              >
                <span>Skip Ad</span>
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold shadow-2xs">
                <Clock className="w-3.5 h-3.5 animate-spin text-amber-600" />
                <span>Skip in {countdown}s</span>
              </div>
            )}
          </div>

          <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden border border-zinc-200">
            <div
              className={`h-full transition-all duration-1000 ease-linear rounded-full ${
                canClose ? 'bg-emerald-500 w-full' : 'bg-blue-600'
              }`}
              style={{ width: canClose ? '100%' : `${((totalDuration - countdown) / totalDuration) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Full-Screen Multi-Ad Area matching the Prompt Box above/below ad layout */}
      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center gap-4 px-4 py-5">
        {!anyAdLoaded && isLoadingAds && (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-2.5" />
            <p className="text-xs sm:text-sm font-semibold text-zinc-500">Loading sponsored advertisement...</p>
          </div>
        )}

        {/* Top Slim Banner */}
        <AdBanner format="320x50" label="" className="my-0" priorityPrimary onStatusChange={onSlot0} />

        {/* Upper Dual Large Ads (like above prompt box) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-items-center">
          <AdBanner format="300x250" label="Sponsored Ad" className="my-0" priorityPrimary onStatusChange={onSlot1} />
          <AdBanner format="300x250" label="Sponsored Partner" className="my-0" priorityPrimary onStatusChange={onSlot2} />
        </div>

        {/* Center Slim Banner */}
        <AdBanner format="320x50" label="" className="my-0" priorityPrimary onStatusChange={onSlot3} />

        {/* Lower Dual Large Ads (like below prompt box) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-items-center">
          <AdBanner format="300x250" label="Featured Partner" className="my-0" priorityPrimary onStatusChange={onSlot4} />
          <AdBanner format="300x250" label="Sponsored Links" className="my-0" priorityPrimary onStatusChange={onSlot5} />
        </div>

        {/* Bottom Slim Banner */}
        <AdBanner format="320x50" label="" className="my-0" priorityPrimary onStatusChange={onSlot6} />

        {!anyAdLoaded && !isLoadingAds && (
          <div className="w-full max-w-md rounded-2xl bg-white border border-zinc-200 shadow-xs px-5 py-7 text-center">
            <Sparkles className="w-7 h-7 text-blue-600 mx-auto mb-2.5" />
            <p className="text-sm sm:text-base font-bold text-zinc-950 mb-1">Preparing Your AI Prompt</p>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Your prompt preview and copy guide are unlocking automatically.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Sticky Skip & Unlock Footer */}
      <div className="w-full bg-white/95 backdrop-blur-md border-t border-zinc-200 sticky bottom-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 text-center">
          {canClose ? (
            <div className="flex flex-col items-center gap-2.5">
              <p className="text-xs text-emerald-700 font-bold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ready! Click below to skip ad and view prompt.</span>
              </p>
              <button
                onClick={handleCloseAndUnlock}
                className="w-full max-w-md py-3.5 px-5 rounded-xl bg-zinc-900 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg cursor-pointer transform active:scale-[0.99] transition-all"
              >
                <span>Skip Ad &amp; View Prompt</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-zinc-500 font-medium py-1">
              You can skip this ad in <span className="font-bold text-zinc-950">{countdown} seconds</span> to view full photo prompt details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
