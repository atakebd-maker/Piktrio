import React, { useEffect, useId, useRef, useState } from 'react';

export type AdFormat = '320x50' | '300x250';

interface AdBannerProps {
  className?: string;
  label?: string;
  format?: AdFormat;
}

const PLACEMENT_CONFIG: Record<
  AdFormat,
  { placement: string; width: number; height: number; iframePath: string }
> = {
  '300x250': {
    placement: 'baa7cc78fcba3fd3f529f4be86c9a63cae7ec160',
    width: 300,
    height: 250,
    iframePath: '/bengalads-300x250.html',
  },
  '320x50': {
    placement: '08b7db13a6d76ff83899aa3766f3e1deb91abd17',
    width: 320,
    height: 50,
    iframePath: '/bengalads-320x50.html',
  },
};

const isZoneVisible = (zone: HTMLElement): boolean => {
  if (zone.childNodes.length === 0) return false;
  if (zone.style.display === 'none') return false;
  const h = zone.style.height;
  if ((h === '0' || h === '0px') && zone.scrollHeight === 0 && zone.offsetHeight === 0) {
    return false;
  }
  return true;
};

export const AdBanner: React.FC<AdBannerProps> = ({
  className = '',
  label = 'Sponsored Ad',
  format = '320x50',
}) => {
  const rawId = useId();
  const cleanId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAd, setHasAd] = useState(false);

  const { placement, width, height, iframePath } =
    PLACEMENT_CONFIG[format] || PLACEMENT_CONFIG['320x50'];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setHasAd(false);
    container.replaceChildren();

    const baseZoneId = `zone-${placement}`;
    const canUsePrimaryDom = !document.getElementById(baseZoneId);

    if (canUsePrimaryDom) {
      // Primary slot on document: render directly with exact unmodified zone ID
      const zone = document.createElement('div');
      zone.id = baseZoneId;
      zone.style.width = `${width}px`;
      zone.style.height = '0';
      zone.style.maxWidth = '100%';
      zone.style.overflow = 'hidden';
      zone.style.display = 'none';
      zone.style.margin = '0 auto';
      container.appendChild(zone);

      const updateVisibility = () => {
        setHasAd(isZoneVisible(zone));
      };

      const observer = new MutationObserver(updateVisibility);
      observer.observe(zone, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['style', 'class'],
      });

      const pollTimer = window.setInterval(updateVisibility, 500);
      const stopPollTimer = window.setTimeout(() => window.clearInterval(pollTimer), 10000);

      const script = document.createElement('script');
      script.async = true;
      script.referrerPolicy = 'origin';
      script.src = `https://bengalads.com/widget-render.php?placement=${placement}&target=${encodeURIComponent(
        baseZoneId
      )}&width=${width}&height=${height}&v=20260816_2231`;
      document.head.appendChild(script);

      return () => {
        observer.disconnect();
        window.clearInterval(pollTimer);
        window.clearTimeout(stopPollTimer);
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        container.replaceChildren();
      };
    }

    // Secondary / Modal slots: isolate inside same-origin HTML frame so every slot
    // receives the exact unmodified zone-${placement} ID and its own widget lifecycle.
    const iframe = document.createElement('iframe');
    iframe.src = `${iframePath}?slot=${encodeURIComponent(cleanId)}`;
    iframe.title = label || 'Sponsored Advertisement';
    iframe.scrolling = 'no';
    iframe.style.width = `${width}px`;
    iframe.style.maxWidth = '100%';
    iframe.style.height = '0px';
    iframe.style.border = '0';
    iframe.style.margin = '0 auto';
    iframe.style.display = 'block';
    iframe.style.overflow = 'hidden';
    iframe.style.background = 'transparent';
    container.appendChild(iframe);

    let innerObserver: MutationObserver | null = null;
    let pollTimer: number | null = null;
    let stopPollTimer: number | null = null;

    const handleLoad = () => {
      try {
        const innerDoc = iframe.contentDocument;
        const innerZone = innerDoc?.getElementById(baseZoneId);
        if (!innerZone) return;

        const syncIframeSize = () => {
          const visible = isZoneVisible(innerZone);
          if (visible) {
            const measured = Math.max(
              height,
              innerZone.scrollHeight || 0,
              innerZone.offsetHeight || 0
            );
            iframe.style.height = `${measured}px`;
            setHasAd(true);
          } else {
            iframe.style.height = '0px';
            setHasAd(false);
          }
        };

        syncIframeSize();
        innerObserver = new MutationObserver(syncIframeSize);
        innerObserver.observe(innerZone, {
          attributes: true,
          childList: true,
          subtree: true,
          attributeFilter: ['style', 'class'],
        });

        pollTimer = window.setInterval(syncIframeSize, 500);
        stopPollTimer = window.setTimeout(() => {
          if (pollTimer !== null) {
            window.clearInterval(pollTimer);
            pollTimer = null;
          }
        }, 12000);
      } catch {
        // Fallback if frame document isn't accessible
      }
    };

    iframe.addEventListener('load', handleLoad);

    return () => {
      iframe.removeEventListener('load', handleLoad);
      if (innerObserver) innerObserver.disconnect();
      if (pollTimer !== null) window.clearInterval(pollTimer);
      if (stopPollTimer !== null) window.clearTimeout(stopPollTimer);
      container.replaceChildren();
    };
  }, [placement, width, height, iframePath, cleanId, label]);

  const defaultMargin = className.includes('my-') ? '' : hasAd ? 'my-2.5' : 'my-0';

  return (
    <div className={`flex flex-col items-center justify-center w-full ${defaultMargin} ${className}`}>
      {label && hasAd && (
        <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 mb-1 select-none">
          {label}
        </span>
      )}
      <div ref={containerRef} className="w-full flex items-center justify-center" />
    </div>
  );
};
