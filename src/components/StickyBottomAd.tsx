import React, { useState } from 'react';
import { X, ChevronUp } from 'lucide-react';
import { AdBanner } from './AdBanner';

export const StickyBottomAd: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isVisible) return null;

  return (
    <aside aria-label="Advertisement" className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none pb-1 sm:pb-2">
      <div className="pointer-events-auto relative bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-t-2xl sm:rounded-2xl border border-gray-200/90 shadow-2xl flex flex-col items-center">
        {/* Controls */}
        <div className="w-full flex items-center justify-between px-1 mb-0.5 text-[10px] text-gray-400 font-medium">
          <span className="uppercase tracking-wider">Sponsored</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="hover:text-gray-700 transition-colors cursor-pointer p-0.5"
              title={isMinimized ? 'Expand ad' : 'Minimize ad'}
            >
              <ChevronUp className={`w-3.5 h-3.5 transition-transform duration-200 ${isMinimized ? '' : 'rotate-180'}`} />
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="hover:text-gray-700 transition-colors cursor-pointer p-0.5"
              title="Close ad"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="w-[320px] h-[50px] overflow-hidden flex items-center justify-center">
            <AdBanner label="" className="my-0" />
          </div>
        )}
      </div>
    </aside>
  );
};
