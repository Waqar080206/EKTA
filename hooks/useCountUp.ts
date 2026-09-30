"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  target: number;
  durationMs?: number;
  decimals?: number;
  enabled?: boolean;
};

/**
 * Interpolates a number from 0 to `target` using requestAnimationFrame.
 * Honours prefers-reduced-motion by snapping straight to the final value.
 */
export function useCountUp({
  target,
  durationMs = 1600,
  decimals = 0,
  enabled = true,
}: Options) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [value, setValue] = useState(0);
  const frameRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    if (reduced) {
      setValue(Number(target.toFixed(decimals)));
      doneRef.current = true;
      return;
    }

    if (doneRef.current) return;

    let start: number | null = null;

    const step = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - t, 4);
      const next = target * eased;
      setValue(decimals > 0 ? Number(next.toFixed(decimals)) : Math.round(next));
      if (t < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        doneRef.current = true;
      }
    };

    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [target, durationMs, decimals, enabled, reduced]);

  return value;
}
