"use client";

import { useEffect } from "react";

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const REVEAL = "[data-reveal]";
const GROUP = "[data-stagger]";
const DRAW = "[data-draw]";
const DRAW_PATH = ".draw-path";
const CHECK = ".checkmark-path";

/**
 * One page-level observer drives every reveal in the document.
 *
 * Rules:
 *  - `[data-reveal]`  self-reveals when it enters the viewport.
 *  - `[data-stagger]` reveals itself, and its children pick the state up
 *    through the `.is-revealed > *` rule in globals.css.
 *  - `[data-draw]`    line-draw primitive, used standalone or inside a stagger
 *    group (where the group already supplies `.is-revealed`).
 *  - `.draw-path` / `.checkmark-path` measure their own length so the
 *    dash offset matches the real geometry of the shape.
 */
export function RevealController() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        `${REVEAL}, ${GROUP}, ${DRAW}, ${DRAW_PATH}, ${CHECK}`,
      ),
    );

    if (REDUCED) {
      nodes.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    // Cache true path lengths once, up front, so the CSS transition
    // does not have to re-measure on every reveal.
    nodes.forEach((el) => {
      if (el instanceof SVGPathElement && !el.style.getPropertyValue("--len")) {
        try {
          el.style.setProperty("--len", el.getTotalLength().toString());
        } catch {
          el.style.setProperty("--len", "1000");
        }
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    const drawIo = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            drawIo.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -4% 0px" },
    );

    for (const el of nodes) {
      if (el instanceof SVGPathElement) drawIo.observe(el);
      else io.observe(el);
    }

    return () => {
      io.disconnect();
      drawIo.disconnect();
    };
  }, []);

  return null;
}
