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
  const adId = useId();
  const is300x250 = format === '300x250';
  const width = is300x250 ? 300 : 320;
  const height = is300x250 ? 250 : 50;

  // BengalAds placement keys
  const placement = is300x250
    ? 'baa7cc78fcba3fd3f529f4be86c9a63cae7ec160'
    : '08b7db13a6d76ff83899aa3766f3e1deb91abd17';

  const zoneId = `zone-${placement}`;

  const htmlContent = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body, html {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
      }
    </style>
  </head>
  <body>
    <div id="${zoneId}" style="width:${width}px;height:${height}px;max-width:100%;overflow:hidden;"></div>
    <script>
      (function(){
        var s = document.createElement("script");
        s.async = true;
        s.referrerPolicy = "origin";
        s.src = "https://bengalads.com/widget-render.php?placement=${placement}&target=${zoneId}&width=${width}&height=${height}&v=20260816_2231";
        document.head.appendChild(s);
      })();
    </script>
  </body>
</html>`;

  return (
    <div className={`flex flex-col items-center justify-center my-3 w-full ${className}`}>
      {label && (
        <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 mb-1 select-none">
          {label}
        </span>
      )}
      <div 
        style={{ width: `${width}px`, height: `${height}px` }}
        className="max-w-full overflow-hidden rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs flex items-center justify-center"
      >
        <iframe
          id={adId}
          title={label || 'Advertisement'}
          srcDoc={htmlContent}
          width={width}
          height={height}
          scrolling="no"
          frameBorder="0"
          style={{ border: 'none', width: `${width}px`, height: `${height}px`, overflow: 'hidden' }}
        />
      </div>
    </div>
  );
};
