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
  running: boolean;
  pending: QueueEntry[];
}

const placementQueues = new Map<string, PlacementQueue>();
let globalSlotCounter = 0;

const getQueue = (placement: string): PlacementQueue => {
  let q = placementQueues.get(placement);
  if (!q) {
    q = { running: false, pending: [] };
    placementQueues.set(placement, q);
  }
  return q;
};

const pumpQueue = (placement: string) => {
  const q = getQueue(placement);
  if (q.running || q.pending.length === 0) return;

  const entry = q.pending.shift()!;
  q.running = true;

  let finished = false;
  const done = () => {
    if (finished) return;
    finished = true;
    q.running = false;
    pumpQueue(placement);
  };

  try {
    entry.run(done);
  } catch {
    done();
  }
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

const retireExistingZoneId = (baseZoneId: string) => {
  let existing = document.getElementById(baseZoneId);
  while (existing) {
    const retiredId = `${baseZoneId}-slot-${++globalSlotCounter}`;
    existing.id = retiredId;
    existing.querySelectorAll('style').forEach((styleEl) => {
      if (styleEl.textContent && styleEl.textContent.includes(baseZoneId)) {
        styleEl.textContent = styleEl.textContent.split(baseZoneId).join(retiredId);
      }
    });
    existing = document.getElementById(baseZoneId);
  }
};

export const AdBanner: React.FC<AdBannerProps> = ({
  className = '',
  label = 'Sponsored Ad',
  format = '320x50',
  priorityPrimary = false,
  delayMs = 0,
  onStatusChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const statusCbRef = useRef(onStatusChange);
  statusCbRef.current = onStatusChange;

  const [hasAd, setHasAd] = useState(false);

  const { placement, width, height } =
    PLACEMENT_CONFIG[format] || PLACEMENT_CONFIG['320x50'];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let unmounted = false;
    setHasAd(false);
    statusCbRef.current?.(false);
    container.replaceChildren();

    const baseZoneId = `zone-${placement}`;
    const encodedTarget = encodeURIComponent(baseZoneId);

    const zone = document.createElement('div');
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

    const pollTimer = window.setInterval(syncVisibility, 350);
    const stopPollTimer = window.setTimeout(() => window.clearInterval(pollTimer), 15000);

    let cancelActiveTurn: (() => void) | null = null;

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
        let stage1Script: HTMLScriptElement | null = null;

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
          if (stage1Script && stage1Script.parentNode) {
            stage1Script.parentNode.removeChild(stage1Script);
          }
          finishTurn();
        };

        // Ensure ONLY this active slot holds the exact baseZoneId during script execution
        retireExistingZoneId(baseZoneId);
        zone.id = baseZoneId;

        // Clear previous widget-render scripts for this placement target
        document.head
          .querySelectorAll<HTMLScriptElement>('script[src*="bengalads.com/widget-render.php"]')
          .forEach((s) => {
            if (s.src.includes(`target=${encodedTarget}`) && s.parentNode) {
              s.parentNode.removeChild(s);
            }
          });

        const scheduleSettle = (ms: number) => {
          if (settleTimer !== null) window.clearTimeout(settleTimer);
          settleTimer = window.setTimeout(finishTurn, ms);
        };

        // Watch document.head for Stage 2 (&vid=) script appended by Stage 1
        headObserver = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            mutation.addedNodes.forEach((node) => {
              if (
                node instanceof HTMLScriptElement &&
                node.src.includes('bengalads.com/widget-render.php') &&
                node.src.includes(`target=${encodedTarget}`) &&
                node.src.includes('vid=')
              ) {
                const onStage2Complete = () => {
                  syncVisibility();
                  scheduleSettle(zone.childNodes.length > 0 ? 550 : 120);
                };
                node.addEventListener('load', onStage2Complete, { once: true });
                node.addEventListener('error', finishTurn, { once: true });
              }
            });
          }
        });
        headObserver.observe(document.head, { childList: true });

        safetyTimer = window.setTimeout(finishTurn, 4000);

        const injectScript = () => {
          if (unmounted || turnClosed || !container.isConnected) {
            finishTurn();
            return;
          }
          stage1Script = document.createElement('script');
          stage1Script.async = true;
          stage1Script.referrerPolicy = 'origin';
          stage1Script.src = `https://bengalads.com/widget-render.php?placement=${placement}&target=${encodedTarget}&width=${width}&height=${height}&v=20260816_2231`;
          stage1Script.addEventListener('error', finishTurn, { once: true });
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
    if (priorityPrimary) {
      q.pending.unshift(entry);
    } else {
      q.pending.push(entry);
    }
    pumpQueue(placement);

    return () => {
      unmounted = true;
      window.clearInterval(pollTimer);
      window.clearTimeout(stopPollTimer);
      zoneObserver.disconnect();
      zone.removeEventListener('load', syncVisibility, true);

      const idx = q.pending.indexOf(entry);
      if (idx !== -1) {
        q.pending.splice(idx, 1);
      }
      if (cancelActiveTurn) {
        cancelActiveTurn();
      }

      container.replaceChildren();
      statusCbRef.current?.(false);
    };
  }, [placement, width, height, priorityPrimary, delayMs]);

  const defaultMargin = className.includes('my-') ? '' : hasAd ? 'my-2.5' : 'my-0';

  return (
    <div
      className={`flex flex-col items-center justify-center w-full ${defaultMargin} ${className}`}
      style={hasAd ? undefined : { height: 0, minHeight: 0, overflow: 'hidden', margin: 0, padding: 0 }}
    >
      {label && hasAd && (
        <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 mb-1 select-none">
          {label}
        </span>
      )}
      <div ref={containerRef} className="w-full flex items-center justify-center" />
    </div>
  );
};
