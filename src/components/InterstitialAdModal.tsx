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
  const [slotStatuses, setSlotStatuses] = useState<[boolean, boolean, boolean]>([false, false, false]);
  const [isLoadingAds, setIsLoadingAds] = useState<boolean>(true);

  const handleSlotStatus = useCallback((index: 0 | 1 | 2, hasAd: boolean) => {
    setSlotStatuses((prev) => {
      if (prev[index] === hasAd) return prev;
      const next: [boolean, boolean, boolean] = [...prev] as [boolean, boolean, boolean];
      next[index] = hasAd;
      return next;
    });
  }, []);

  const onSlot0 = useCallback((v: boolean) => handleSlotStatus(0, v), [handleSlotStatus]);
  const onSlot1 = useCallback((v: boolean) => handleSlotStatus(1, v), [handleSlotStatus]);
  const onSlot2 = useCallback((v: boolean) => handleSlotStatus(2, v), [handleSlotStatus]);

  // When modal is triggered on photo click, immediately start the countdown and load the ad
  useEffect(() => {
    if (isOpen) {
      const duration = getRequiredDuration();
      setTotalDuration(duration);
      setCountdown(duration);
      setCanClose(false);
      setSlotStatuses([false, false, false]);
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

  const handleBackdropClick = () => {
    if (!canClose) return;
    handleCloseAndUnlock();
  };

  if (!isOpen) return null;

  const anyAdLoaded = slotStatuses[0] || slotStatuses[1] || slotStatuses[2];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      
      {/* Background Overlay */}
      <div 
        className="fixed inset-0"
        onClick={handleBackdropClick}
      />

      {/* Main Full-Screen Interstitial Ad Dialog */}
      <div className="relative bg-white sm:rounded-3xl shadow-2xl w-full min-h-screen sm:min-h-0 sm:max-w-lg sm:max-h-[95vh] p-2.5 sm:p-6 border-0 sm:border sm:border-slate-200 z-10 flex flex-col justify-between animate-in fade-in duration-200 text-slate-800 overflow-y-auto">
        
        {/* Top Bar + Progress */}
        <div className="w-full">
          {/* Header with Title & Live Countdown / Skip Ad Button */}
          <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Sponsored Advertisement</span>
            </div>

            {/* Countdown Badge / Skip Ad Button */}
            {canClose ? (
              <button
                onClick={handleCloseAndUnlock}
                aria-label="Skip ad and view prompt"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer shadow-md transform active:scale-95 animate-pulse"
                title="Skip Ad & View Full Prompt"
              >
                <span>Skip Ad</span>
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-[11px] font-bold shadow-xs">
                <Clock className="w-3.5 h-3.5 animate-spin text-amber-600" />
                <span>Skip in {countdown}s</span>
              </div>
            )}
          </div>

          {/* Dynamic Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 mb-3 overflow-hidden border border-slate-200">
            <div
              className={`h-full transition-all duration-1000 ease-linear rounded-full ${
                canClose ? 'bg-emerald-500 w-full' : 'bg-blue-600'
              }`}
              style={{ width: canClose ? '100%' : `${((totalDuration - countdown) / totalDuration) * 100}%` }}
            />
          </div>
        </div>

        {/* Full-Screen Ad Area: 320x50 (small) + Two 300x250 (large) Direct-DOM BengalAds Widgets */}
        <div className="w-full flex-1 flex flex-col items-center justify-center gap-3 my-2">
          {!anyAdLoaded && isLoadingAds && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-7 h-7 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-2.5" />
              <p className="text-xs font-semibold text-slate-500">Loading sponsored advertisement...</p>
            </div>
          )}

          <AdBanner format="320x50" label="" className="my-0" priorityPrimary onStatusChange={onSlot0} />
          <AdBanner format="300x250" label="" className="my-0" priorityPrimary onStatusChange={onSlot1} />
          <AdBanner format="300x250" label="" className="my-0" priorityPrimary delayMs={150} onStatusChange={onSlot2} />

          {!anyAdLoaded && !isLoadingAds && (
            <div className="w-full max-w-sm rounded-2xl bg-slate-50 border border-slate-200 px-4 py-6 text-center">
              <Sparkles className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-800 mb-1">Preparing Your AI Prompt</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your prompt preview and copy guide are unlocking automatically.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Status / Skip & Unlock Action */}
        <div className="w-full pt-3 mt-2 border-t border-slate-100 text-center">
          {canClose ? (
            <div className="flex flex-col items-center gap-2.5">
              <p className="text-xs text-emerald-700 font-bold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ready! Click below to skip ad and view prompt.</span>
              </p>
              <button
                onClick={handleCloseAndUnlock}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer transform active:scale-[0.99] transition-all"
              >
                <span>Skip Ad &amp; View Prompt</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <p className="text-xs text-slate-500 font-medium py-1">
              You can skip this ad in <span className="font-bold text-slate-800">{countdown} seconds</span> to view full photo prompt details.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
