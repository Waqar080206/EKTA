"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reports true once the returned ref's element has entered the viewport.
 * Used to gate number interpolation, not for entrance transitions.
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  threshold = 0.3,
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}
