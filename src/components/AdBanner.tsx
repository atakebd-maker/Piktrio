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
  const height = is300x250 ? 250 : 50;
  const adUrl = is300x250 ? '/bengalads-300x250.html' : '/bengalads-320x50.html';

  return (
    <div className={`flex flex-col items-center justify-center my-2.5 w-full ${className}`}>
      {label && (
        <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 mb-1 select-none">
          {label}
        </span>
      )}
      <div 
        style={{
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: '100%',
        }}
        className="flex items-center justify-center overflow-hidden rounded-xl shadow-2xs"
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
            maxHeight: `${height}px`,
            display: 'block',
            overflow: 'hidden',
          }}
        />
      </div>
    </div>
  );
};
