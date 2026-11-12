import React, { useState, useEffect } from 'react';
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

  // When modal is triggered on photo click, immediately start the countdown and load the ad
  useEffect(() => {
    if (isOpen) {
      const duration = getRequiredDuration();
      setTotalDuration(duration);
      setCountdown(duration);
      setCanClose(false);
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
    // Disallow backdrop close during active countdown
    if (!canClose) return;
    handleCloseAndUnlock();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      
      {/* Background Overlay */}
      <div 
        className="fixed inset-0"
        onClick={handleBackdropClick}
      />

      {/* Main Full-Screen Interstitial Ad Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-[360px] sm:max-w-md w-full p-4 sm:p-5 border border-slate-200 z-10 flex flex-col items-center animate-in fade-in duration-200 text-slate-800 max-h-[94vh] overflow-y-auto">
        
        {/* Header with Title & Live Countdown / Close Button */}
        <div className="w-full flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Advertisement &bull; BengalAds Partner</span>
          </div>

          {/* Countdown Badge / Close Button */}
          {canClose ? (
            <button
              onClick={handleCloseAndUnlock}
              aria-label="Close ad and view content"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer shadow-md transform active:scale-95 animate-pulse"
              title="Close Ad & View Full Prompt"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Close &amp; View</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-[11px] font-bold shadow-xs">
              <Clock className="w-3.5 h-3.5 animate-spin text-amber-600" />
              <span>Wait {countdown}s</span>
            </div>
          )}
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2.5 overflow-hidden border border-slate-200">
          <div
            className={`h-full transition-all duration-1000 ease-linear rounded-full ${
              canClose ? 'bg-emerald-500 w-full' : 'bg-blue-600'
            }`}
            style={{ width: canClose ? '100%' : `${((totalDuration - countdown) / totalDuration) * 100}%` }}
          />
        </div>

        {/* Two 300x250 BengalAds Ad Widgets: One above, one below */}
        <div className="w-full flex flex-col items-center justify-center gap-3 my-2">
          <AdBanner format="300x250" label="" className="my-0" />
          <AdBanner format="300x250" label="" className="my-0" />
        </div>

        {/* Bottom Status / Unlock Action */}
        <div className="w-full pt-3 mt-1 border-t border-slate-100 text-center">
          {canClose ? (
            <div className="flex flex-col items-center gap-2.5">
              <p className="text-xs text-emerald-700 font-bold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ad completed! Your prompt is unlocked.</span>
              </p>
              <button
                onClick={handleCloseAndUnlock}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer transform active:scale-[0.99] transition-all"
              >
                <span>Continue to Full Prompt</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <p className="text-[11px] text-slate-500 font-medium">
              Please wait <span className="font-bold text-slate-800">{countdown} seconds</span> to unlock full photo prompt details.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
