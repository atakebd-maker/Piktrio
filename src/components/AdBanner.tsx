import React, { useEffect, useRef, useState } from 'react';

export type AdFormat = '320x50' | '300x250';

interface AdBannerProps {
  className?: string;
  label?: string;
  format?: AdFormat;
  priorityPrimary?: boolean;
  delayMs?: number;
  keepSpace?: boolean;
  onStatusChange?: (hasAd: boolean) => void;
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

interface QueueEntry {
  priority: boolean;
  run: (done: () => void) => () => void;
}

interface PlacementQueue {
  activeCount: number;
  pending: QueueEntry[];
}

const placementQueues = new Map<string, PlacementQueue>();
let globalSlotCounter = 0;

const hasVisitorId = (): boolean => {
  try {
    return Boolean(window.localStorage.getItem('bengalads_visitor_id_v1'));
  } catch {
    return true;
  }
};

const getQueue = (placement: string): PlacementQueue => {
  let q = placementQueues.get(placement);
  if (!q) {
    q = { activeCount: 0, pending: [] };
    placementQueues.set(placement, q);
  }
  return q;
};

const pumpQueue = (placement: string) => {
  const q = getQueue(placement);
  // Warm up visitor ID with concurrency 1 on first visit, then allow up to 3 concurrent unique-target requests
  const maxConcurrent = hasVisitorId() ? 3 : 1;

  while (q.activeCount < maxConcurrent && q.pending.length > 0) {
    const entry = q.pending.shift()!;
    q.activeCount += 1;

    let finished = false;
    const done = () => {
      if (finished) return;
      finished = true;
      q.activeCount = Math.max(0, q.activeCount - 1);
      pumpQueue(placement);
    };

    try {
      entry.run(done);
    } catch {
      done();
    }
  }
};

const isZoneVisible = (zone: HTMLElement): boolean => {
  if (zone.childNodes.length === 0) return false;
  if (zone.style.display === 'none') return false;
  const h = zone.style.height;
  if (h !== '0' && h !== '0px') return true;
  if (zone.scrollHeight > 0 || zone.offsetHeight > 0) return true;
  return Boolean(zone.querySelector('iframe, img, a, ins'));
};

export const AdBanner: React.FC<AdBannerProps> = ({
  className = '',
  label = 'Sponsored Ad',
  format = '320x50',
  priorityPrimary = false,
  delayMs = 0,
  onStatusChange,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const statusCbRef = useRef(onStatusChange);
  statusCbRef.current = onStatusChange;

  const [hasAd, setHasAd] = useState(false);

  const { placement, width, height } =
    PLACEMENT_CONFIG[format] || PLACEMENT_CONFIG['320x50'];

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    let unmounted = false;
    let enqueued = false;
    setHasAd(false);
    statusCbRef.current?.(false);
    container.replaceChildren();

    // Unique DOM target ID per AdBanner instance prevents cross-slot overwrite and navigation clobbering
    const slotId = ++globalSlotCounter;
    const uniqueZoneId = `zone-${placement}-s${slotId}`;
    const encodedTarget = encodeURIComponent(uniqueZoneId);

    const zone = document.createElement('div');
    zone.id = uniqueZoneId;
    zone.style.width = `${width}px`;
    zone.style.height = '0';
    zone.style.maxWidth = '100%';
    zone.style.overflow = 'hidden';
    zone.style.display = 'none';
    zone.style.margin = '0 auto';
    container.appendChild(zone);

    let lastVisible = false;
    const syncVisibility = () => {
      if (unmounted) return;
      const visible = isZoneVisible(zone);
      if (visible !== lastVisible) {
        lastVisible = visible;
        setHasAd(visible);
        statusCbRef.current?.(visible);
      }
    };

    const zoneObserver = new MutationObserver(syncVisibility);
    zoneObserver.observe(zone, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['style', 'class'],
    });
    zone.addEventListener('load', syncVisibility, true);

    let pollTimer: number | null = null;
    let stopPollTimer: number | null = null;
    let cancelActiveTurn: (() => void) | null = null;
    const injectedScripts: HTMLScriptElement[] = [];

    const entry: QueueEntry = {
      priority: priorityPrimary,
      run: (done) => {
        if (unmounted || !container.isConnected) {
          done();
          return () => {};
        }

        let turnClosed = false;
        let headObserver: MutationObserver | null = null;
        let delayTimer: number | null = null;
        let settleTimer: number | null = null;
        let safetyTimer: number | null = null;

        // Start polling ONLY when this slot begins executing so queued slots never time out prematurely
        if (pollTimer === null) {
          pollTimer = window.setInterval(syncVisibility, 350);
          stopPollTimer = window.setTimeout(() => {
            if (pollTimer !== null) {
              window.clearInterval(pollTimer);
              pollTimer = null;
            }
          }, 15000);
        }

        const finishTurn = () => {
          if (turnClosed) return;
          turnClosed = true;
          if (delayTimer !== null) window.clearTimeout(delayTimer);
          if (settleTimer !== null) window.clearTimeout(settleTimer);
          if (safetyTimer !== null) window.clearTimeout(safetyTimer);
          if (headObserver) headObserver.disconnect();
          syncVisibility();
          done();
        };

        cancelActiveTurn = () => {
          finishTurn();
        };

        const scheduleSettle = (ms: number) => {
          if (settleTimer !== null) window.clearTimeout(settleTimer);
          settleTimer = window.setTimeout(finishTurn, ms);
        };

        // Watch document.head for Stage 2 (&vid=) script belonging strictly to this unique target
        headObserver = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            mutation.addedNodes.forEach((node) => {
              if (
                node instanceof HTMLScriptElement &&
                node.src.includes('bengalads.com/widget-render.php') &&
                node.src.includes(`target=${encodedTarget}`) &&
                node.src.includes('vid=')
              ) {
                injectedScripts.push(node);
                const onStage2Complete = () => {
                  syncVisibility();
                  scheduleSettle(zone.childNodes.length > 0 ? 600 : 150);
                };
                node.addEventListener('load', onStage2Complete, { once: true });
                node.addEventListener('error', finishTurn, { once: true });
              }
            });
          }
        });
        headObserver.observe(document.head, { childList: true });

        safetyTimer = window.setTimeout(finishTurn, 2500);

        const injectScript = () => {
          if (unmounted || turnClosed || !container.isConnected) {
            finishTurn();
            return;
          }
          const stage1Script = document.createElement('script');
          stage1Script.async = true;
          stage1Script.referrerPolicy = 'origin';
          stage1Script.src = `https://bengalads.com/widget-render.php?placement=${placement}&target=${encodedTarget}&width=${width}&height=${height}&v=20260816_2231`;
          stage1Script.addEventListener('error', finishTurn, { once: true });
          injectedScripts.push(stage1Script);
          document.head.appendChild(stage1Script);
        };

        if (delayMs > 0) {
          delayTimer = window.setTimeout(injectScript, delayMs);
        } else {
          injectScript();
        }

        return cancelActiveTurn;
      },
    };

    const q = getQueue(placement);

    const enqueueSlot = () => {
      if (unmounted || enqueued) return;
      enqueued = true;
      if (priorityPrimary) {
        q.pending.unshift(entry);
      } else {
        q.pending.push(entry);
      }
      pumpQueue(placement);
    };

    let io: IntersectionObserver | null = null;
    const checkViewportAndEnqueue = () => {
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      return rect.top <= vh + 700 && rect.bottom >= -700;
    };

    if (
      priorityPrimary ||
      typeof IntersectionObserver === 'undefined' ||
      checkViewportAndEnqueue()
    ) {
      enqueueSlot();
    } else {
      // Load slots once they are within 700px of viewport so visible & prompt-box ads load immediately
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io?.disconnect();
            io = null;
            enqueueSlot();
          }
        },
        { rootMargin: '700px 0px' }
      );
      io.observe(wrapper);
    }

    return () => {
      unmounted = true;
      if (io) {
        io.disconnect();
        io = null;
      }
      if (pollTimer !== null) window.clearInterval(pollTimer);
      if (stopPollTimer !== null) window.clearTimeout(stopPollTimer);
      zoneObserver.disconnect();
      zone.removeEventListener('load', syncVisibility, true);

      const idx = q.pending.indexOf(entry);
      if (idx !== -1) {
        q.pending.splice(idx, 1);
      }
      if (cancelActiveTurn) {
        cancelActiveTurn();
      }
      injectedScripts.forEach((s) => {
        if (s.parentNode) s.parentNode.removeChild(s);
      });

      container.replaceChildren();
      statusCbRef.current?.(false);
    };
  }, [placement, width, height, priorityPrimary, delayMs]);

  const defaultMargin = className.includes('my-') ? '' : hasAd ? 'my-2.5' : 'my-0';

  return (
    <div
      ref={wrapperRef}
      className={`flex flex-col items-center justify-center w-full min-h-[1px] ${
        hasAd ? defaultMargin : 'my-0'
      } ${hasAd ? className : ''}`}
    >
      {label && hasAd && (
        <span className="text-[10px] tracking-wider uppercase font-semibold text-neutral-500 mb-1 select-none">
          {label}
        </span>
      )}
      <div ref={containerRef} className="w-full flex items-center justify-center" />
    </div>
  );
};
