import React, { useId } from 'react';

export type AdFormat = '320x50' | '300x250';

interface AdBannerProps {
  className?: string;
  label?: string;
  format?: AdFormat;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  className = '',
  label = 'Sponsored Ad',
  format = '320x50',
}) => {
  const rawId = useId();
  const cleanId = rawId.replace(/[^a-zA-Z0-9_-]/g, '_');
  const is300x250 = format === '300x250';
  const width = is300x250 ? 300 : 320;
  const height = is300x250 ? 280 : 70;
  const adUrl = is300x250 ? '/bengalads-300x250.html' : '/bengalads-320x50.html';

  return (
    <div className={`flex flex-col items-center justify-center my-3 w-full ${className}`}>
      {label && (
        <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 mb-1 select-none">
          {label}
        </span>
      )}
      <div 
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        className="max-w-full rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col items-center justify-center p-1 overflow-hidden"
      >
        <iframe
          id={cleanId}
          title={label || 'BengalAds Advertisement'}
          src={adUrl}
          width={width}
          height={height}
          scrolling="no"
          loading="eager"
          style={{
            border: 'none',
            width: `${width}px`,
            height: `${height}px`,
            maxWidth: '100%',
            overflow: 'hidden',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
};
