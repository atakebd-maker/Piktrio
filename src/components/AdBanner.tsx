import React, { useEffect, useId, useRef, useState } from 'react';

export type AdFormat = '320x50' | '300x250';

interface AdBannerProps {
  className?: string;
  label?: string;
  format?: AdFormat;
}

const PLACEMENT_IDS: Record<AdFormat, { placement: string; width: number; height: number }> = {
  '300x250': {
    placement: 'baa7cc78fcba3fd3f529f4be86c9a63cae7ec160',
    width: 300,
    height: 250,
  },
  '320x50': {
    placement: '08b7db13a6d76ff83899aa3766f3e1deb91abd17',
    width: 320,
    height: 50,
  },
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

  const { placement, width, height } = PLACEMENT_IDS[format] || PLACEMENT_IDS['320x50'];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setHasAd(false);
    container.replaceChildren();

    const baseZoneId = `zone-${placement}`;
    const targetZoneId = !document.getElementById(baseZoneId)
      ? baseZoneId
      : `${baseZoneId}-${cleanId}`;

    const zone = document.createElement('div');
    zone.id = targetZoneId;
    zone.style.width = `${width}px`;
    zone.style.height = '0';
    zone.style.maxWidth = '100%';
    zone.style.overflow = 'hidden';
    zone.style.display = 'none';
    zone.style.margin = '0 auto';
    container.appendChild(zone);

    const updateVisibility = () => {
      const visible =
        zone.style.display !== 'none' &&
        zone.style.height !== '0px' &&
        zone.style.height !== '0' &&
        zone.childNodes.length > 0;
      setHasAd(visible);
    };

    const observer = new MutationObserver(updateVisibility);
    observer.observe(zone, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['style', 'class'],
    });

    const script = document.createElement('script');
    script.async = true;
    script.referrerPolicy = 'origin';
    script.src = `https://bengalads.com/widget-render.php?placement=${placement}&target=${encodeURIComponent(
      targetZoneId
    )}&width=${width}&height=${height}&v=20260816_2231`;
    document.head.appendChild(script);

    return () => {
      observer.disconnect();
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      container.replaceChildren();
    };
  }, [placement, width, height, cleanId]);

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
