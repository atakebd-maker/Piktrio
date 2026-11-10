import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { AdBanner } from './AdBanner';

export const TopCollapsibleAd: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      aria-label="Sponsored Top Banner"
      className="w-full bg-slate-100 border-b border-slate-200 transition-all duration-300 relative select-none"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        
        {/* Collapsible Content Area */}
        <div
          className={`w-full overflow-hidden transition-all duration-300 flex flex-col items-center ${
            isOpen ? 'max-h-[340px] opacity-100 py-3' : 'max-h-0 opacity-0 py-0 pointer-events-none'
          }`}
        >
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm max-w-sm w-full flex flex-col items-center">
            <div className="flex items-center gap-1.5 mb-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-blue-600" />
              <span>Sponsored Feature</span>
            </div>
            {/* 300x250 BengalAds Banner */}
            <AdBanner format="300x250" label="" className="my-0" />
          </div>
        </div>

        {/* Toggle Arrow Bar */}
        <div className="w-full flex items-center justify-center py-1">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Hide banner' : 'Show banner'}
            className="group flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-600 text-[11px] font-bold border border-slate-200 shadow-xs transition-all cursor-pointer transform active:scale-95"
            title={isOpen ? 'Click arrow to slide up' : 'Click arrow to slide down'}
          >
            <span>{isOpen ? 'Hide Ad' : 'Show Ad'}</span>
            <div className="w-4 h-4 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
              {isOpen ? (
                <ChevronUp className="w-3 h-3 text-slate-600 group-hover:text-blue-600" />
              ) : (
                <ChevronDown className="w-3 h-3 text-slate-600 group-hover:text-blue-600" />
              )}
            </div>
          </button>
        </div>

      </div>
    </aside>
  );
};
