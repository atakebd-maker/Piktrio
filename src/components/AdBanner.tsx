import React, { useState, useEffect, useId } from 'react';

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
  
  // Default base heights with generous room for BengalAds branding text/attribution
  const initialHeight = is300x250 ? 285 : 75;
  const [frameHeight, setFrameHeight] = useState<number>(initialHeight);

  // BengalAds placement keys
  const placement = is300x250
    ? 'baa7cc78fcba3fd3f529f4be86c9a63cae7ec160'
    : '08b7db13a6d76ff83899aa3766f3e1deb91abd17';

  const zoneId = `zone-${placement}`;

  // Listen for dynamic resize messages from the BengalAds iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data &&
        event.data.type === 'BENGALADS_RESIZE' &&
        event.data.cleanId === cleanId
      ) {
        const receivedHeight = Number(event.data.height);
        if (!isNaN(receivedHeight) && receivedHeight > 20) {
          // Add 4px buffer to ensure 100% of the BengalAds bottom branding is visible
          setFrameHeight(Math.max(initialHeight, Math.ceil(receivedHeight) + 4));
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [cleanId, initialHeight]);

  const htmlContent = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      html, body {
        width: 100%;
        margin: 0;
        padding: 0;
        background: transparent;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        overflow: visible;
      }
      #${zoneId} {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
      }
    </style>
  </head>
  <body>
    <div id="${zoneId}"></div>
    <script>
      (function(){
        var s = document.createElement("script");
        s.async = true;
        s.referrerPolicy = "origin";
        s.src = "https://bengalads.com/widget-render.php?placement=${placement}&target=${zoneId}&width=${width}&height=${is300x250 ? 250 : 50}&v=20260816_2231";
        document.head.appendChild(s);
      })();

      function reportAdHeight() {
        try {
          var body = document.body;
          var html = document.documentElement;
          var h = Math.max(
            body ? body.scrollHeight : 0,
            body ? body.offsetHeight : 0,
            html ? html.clientHeight : 0,
            html ? html.scrollHeight : 0,
            html ? html.offsetHeight : 0
          );
          if (h > 20) {
            window.parent.postMessage({
              type: 'BENGALADS_RESIZE',
              cleanId: '${cleanId}',
              height: h
            }, '*');
          }
        } catch (e) {}
      }

      window.addEventListener('load', reportAdHeight);
      document.addEventListener('DOMContentLoaded', reportAdHeight);

      // Periodically check height during render to catch asynchronous ad injection
      var intervals = [100, 300, 600, 1000, 1500, 2500, 4000];
      intervals.forEach(function(t) {
        setTimeout(reportAdHeight, t);
      });

      if (typeof ResizeObserver !== 'undefined' && document.body) {
        new ResizeObserver(reportAdHeight).observe(document.body);
      }
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
        style={{
          width: `${width}px`,
          minHeight: `${frameHeight}px`,
        }}
        className="max-w-full rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col items-center justify-center p-1.5 transition-all duration-300"
      >
        <iframe
          id={cleanId}
          title={label || 'BengalAds Advertisement'}
          srcDoc={htmlContent}
          width={width}
          height={frameHeight}
          scrolling="no"
          frameBorder="0"
          style={{
            border: 'none',
            width: `${width}px`,
            height: `${frameHeight}px`,
            maxWidth: '100%',
            overflow: 'visible',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
};
