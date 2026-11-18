import React, { useEffect, useId, useRef, useState } from 'react';

export type AdFormat = '320x50' | '300x250';

interface AdBannerProps {
  className?: string;
  label?: string;
  format?: AdFormat;
  priorityPrimary?: boolean;
  delayMs?: number;
  keepSpace?: boolean;
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

let globalSlotCounter = 0;

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
  priorityPrimary = false,
  delayMs = 0,
  keepSpace = false,
}) => {
  const rawId = useId();
  const cleanId = rawId.replace(/[^a-zA-Z0-9-]/g, '');
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
    const existingPrimary = document.getElementById(baseZoneId);
    const useDirectDom = !existingPrimary || priorityPrimary;

    if (useDirectDom) {
      let suspendedBgEl: HTMLElement | null = null;
      if (existingPrimary && priorityPrimary) {
        suspendedBgEl = existingPrimary;
        suspendedBgEl.id = `${baseZoneId}-bg-${cleanId || ++globalSlotCounter}`;
      }

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

      const pollTimer = window.setInterval(updateVisibility, 400);
      const stopPollTimer = window.setTimeout(() => window.clearInterval(pollTimer), 12000);

      const encodedTarget = encodeURIComponent(baseZoneId);
      let stage1Script: HTMLScriptElement | null = null;

      const loadTimer = window.setTimeout(() => {
        if (!container.isConnected) return;
        stage1Script = document.createElement('script');
        stage1Script.async = true;
        stage1Script.referrerPolicy = 'origin';
        stage1Script.src = `https://bengalads.com/widget-render.php?placement=${placement}&target=${encodedTarget}&width=${width}&height=${height}&v=20260816_2231`;
        document.head.appendChild(stage1Script);
      }, delayMs);

      return () => {
        window.clearTimeout(loadTimer);
        window.clearInterval(pollTimer);
        window.clearTimeout(stopPollTimer);
        observer.disconnect();

        if (stage1Script && stage1Script.parentNode) {
          stage1Script.parentNode.removeChild(stage1Script);
        }
        document.head
          .querySelectorAll<HTMLScriptElement>('script[src*="bengalads.com/widget-render.php"]')
          .forEach((s) => {
            if (s.src.includes(`target=${encodedTarget}`) && s.parentNode) {
              s.parentNode.removeChild(s);
            }
          });

        container.replaceChildren();

        if (suspendedBgEl && suspendedBgEl.isConnected && !document.getElementById(baseZoneId)) {
          suspendedBgEl.id = baseZoneId;
        }
      };
    }

    // Secondary slots: mount full-dimension same-origin iframe (NOT 0px!) so BengalAds
    // receives exact unmodified zone-${placement} AND full visible viewport dimensions.
    const iframe = document.createElement('iframe');
    iframe.src = `${iframePath}#slot-${++globalSlotCounter}`;
    iframe.title = label || 'Sponsored Advertisement';
    iframe.scrolling = 'no';
    iframe.width = String(width);
    iframe.height = String(height);
    iframe.style.width = `${width}px`;
    iframe.style.maxWidth = '100%';
    iframe.style.height = `${height}px`;
    iframe.style.border = '0';
    iframe.style.margin = '0 auto';
    iframe.style.display = 'block';
    iframe.style.overflow = 'hidden';
    iframe.style.background = 'transparent';
    setHasAd(true);

    let innerObserver: MutationObserver | null = null;
    let collapseTimer: number | null = null;
    let mountTimer: number | null = null;

    const handleLoad = () => {
      try {
        const innerZone = iframe.contentDocument?.getElementById(baseZoneId);
        if (!innerZone) return;

        const syncSize = () => {
          if (isZoneVisible(innerZone)) {
            const measured = Math.max(
              height,
              innerZone.scrollHeight || 0,
              innerZone.offsetHeight || 0
            );
            iframe.style.height = `${measured}px`;
            setHasAd(true);
            if (collapseTimer !== null) {
              window.clearTimeout(collapseTimer);
              collapseTimer = null;
            }
          }
        };

        syncSize();
        innerObserver = new MutationObserver(syncSize);
        innerObserver.observe(innerZone, {
          attributes: true,
          childList: true,
          subtree: true,
          attributeFilter: ['style', 'class'],
        });

        if (!keepSpace) {
          collapseTimer = window.setTimeout(() => {
            if (!isZoneVisible(innerZone)) {
              iframe.style.height = '0px';
              setHasAd(false);
            }
          }, 6000);
        }
      } catch {
        // Keep default visible size if contentDocument check fails
      }
    };

    iframe.addEventListener('load', handleLoad);

    const existingIframes = document.querySelectorAll(`iframe[src^="${iframePath}"]`).length;
    const effectiveDelay = delayMs > 0 ? delayMs : Math.min(existingIframes * 150, 750);

    mountTimer = window.setTimeout(() => {
      if (container.isConnected) {
        container.appendChild(iframe);
      }
    }, effectiveDelay);

    return () => {
      if (mountTimer !== null) window.clearTimeout(mountTimer);
      if (collapseTimer !== null) window.clearTimeout(collapseTimer);
      if (innerObserver) innerObserver.disconnect();
      iframe.removeEventListener('load', handleLoad);
      container.replaceChildren();
    };
  }, [placement, width, height, iframePath, cleanId, priorityPrimary, delayMs, keepSpace, label]);

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
