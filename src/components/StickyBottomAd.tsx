import React, { useState } from 'react';
import { X, ChevronUp } from 'lucide-react';
import { AdBanner } from './AdBanner';

export const StickyBottomAd: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isVisible) return null;

  return (
    <aside aria-label="Advertisement" className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none pb-1 sm:pb-2">
      <div className="pointer-events-auto relative bg-white/95 backdrop-blur-md px-2 py-1 rounded-t-xl sm:rounded-xl border border-slate-200 shadow-xl flex flex-col items-center max-w-full">
        {/* Controls */}
        <div className="w-full flex items-center justify-between px-1 mb-0.5 text-[10px] text-slate-400 font-medium">
          <span className="uppercase tracking-wider">Sponsored</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="hover:text-blue-600 text-slate-400 transition-colors cursor-pointer p-0.5"
              title={isMinimized ? 'Expand ad' : 'Minimize ad'}
            >
              <ChevronUp className={`w-3.5 h-3.5 transition-transform duration-200 ${isMinimized ? '' : 'rotate-180'}`} />
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="hover:text-blue-600 text-slate-400 transition-colors cursor-pointer p-0.5"
              title="Close ad"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="w-full max-w-full flex items-center justify-center overflow-hidden">
            <AdBanner label="" className="my-0" format="320x50" />
          </div>
        )}
      </div>
    </aside>
  );
};
