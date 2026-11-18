import React, { useEffect, useId, useRef, useState } from 'react';

export type AdFormat = '320x50' | '300x250';

interface AdBannerProps {
  className?: string;
  label?: string;
  format?: AdFormat;
  priorityPrimary?: boolean;
  delayMs?: number;
}

const PLACEMENT_CONFIG: Record<
  AdFormat,
  { placement: string; width: number; height: number }
> = {
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
  delayMs,
}) => {
  const rawId = useId();
  const cleanId = rawId.replace(/[^a-zA-Z0-9-]/g, '');
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAd, setHasAd] = useState(false);

  const { placement, width, height } =
    PLACEMENT_CONFIG[format] || PLACEMENT_CONFIG['320x50'];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setHasAd(false);
    container.replaceChildren();

    const baseZoneId = `zone-${placement}`;
    let suspendedBgEl: HTMLElement | null = null;
    let targetZoneId = baseZoneId;
    let staggerDelayMs = 0;

    const existingPrimary = document.getElementById(baseZoneId);
    if (existingPrimary) {
      if (priorityPrimary) {
        // Temporarily yield background primary zone ID while modal/priority slot is open
        suspendedBgEl = existingPrimary;
        suspendedBgEl.id = `${baseZoneId}-bg-${cleanId || ++globalSlotCounter}`;
        targetZoneId = baseZoneId;
        staggerDelayMs = 0;
      } else {
        let candidate = `${baseZoneId}-${++globalSlotCounter}`;
        while (document.getElementById(candidate)) {
          candidate = `${baseZoneId}-${++globalSlotCounter}`;
        }
        targetZoneId = candidate;
        // Slight stagger prevents simultaneous vid race & burst throttling on secondary slots
        const existingCount = document.querySelectorAll(`[id^="${baseZoneId}"]`).length;
        staggerDelayMs = typeof delayMs === 'number' ? delayMs : Math.min(existingCount * 160, 800);
      }
    }

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

    const encodedTarget = encodeURIComponent(targetZoneId);
    let stage1Script: HTMLScriptElement | null = null;

    const loadTimer = window.setTimeout(() => {
      if (!container.isConnected) return;
      stage1Script = document.createElement('script');
      stage1Script.async = true;
      stage1Script.referrerPolicy = 'origin';
      stage1Script.src = `https://bengalads.com/widget-render.php?placement=${placement}&target=${encodedTarget}&width=${width}&height=${height}&v=20260816_2231`;
      document.head.appendChild(stage1Script);
    }, staggerDelayMs);

    return () => {
      window.clearTimeout(loadTimer);
      window.clearInterval(pollTimer);
      window.clearTimeout(stopPollTimer);
      observer.disconnect();

      if (stage1Script && stage1Script.parentNode) {
        stage1Script.parentNode.removeChild(stage1Script);
      }
      // Clean up any Stage-2 scripts injected by widget-render.php for this target
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
  }, [placement, width, height, cleanId, priorityPrimary, delayMs]);

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
