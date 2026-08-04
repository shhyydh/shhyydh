import { onMounted, onBeforeUnmount, type Ref } from "vue";

/**
 * Continuous scroll-linked hero morph — vanilla JS, no animation library.
 *
 * Rev 2 — fixes the "stuck at the start" feel:
 *   - The hero is ALWAYS `position: fixed` (top:0 left:0) on desktop, from the
 *     first rAF tick. There is no flow-collapse flip when the morph begins, so
 *     the glide is uninterrupted from pixel 1. The page keeps its own scroll
 *     room in flow (see pages/index.vue .hero-scroll-spacer), so the document
 *     never shrinks.
 *   - Easing is `easeOutCubic` — it responds immediately to the first px of
 *     scroll (no dead-zone slow start) and decelerates smoothly into the dock.
 *   - The text block AND the socials row are both translated by the same
 *     `slack/2`, so the whole left-aligned column glides from viewport-centre
 *     to the top-left as one unit (fixes the socials "snap-left" glitch).
 *   - `prefers-reduced-motion` and viewports < `minViewportWidth` fall back to
 *     the natural CSS state (relative, centered, full-width).
 */

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(Math.max(v, lo), hi);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export interface HeroMorphOptions {
  startY?: number;
  endY?: number;
  minViewportWidth?: number;
}

export function useHeroMorph(
  heroRef: Ref<HTMLElement | null>,
  options: HeroMorphOptions = {}
) {
  const { startY = 0, endY, minViewportWidth = 768 } = options;

  let raf = 0;
  let lastT = -1;
  let textBlock: HTMLElement | null = null;
  let ro: ResizeObserver | null = null;

  // Force a recompute on the next tick (viewport/font metrics changed).
  const invalidate = () => {
    lastT = -1;
  };

  // The text width drives the centering translateX; re-measure whenever the
  // block resizes (web-font load, window resize, devicePixelRatio change, …).
  const ensureObserver = (el: HTMLElement) => {
    if (ro || typeof ResizeObserver === "undefined") return;
    const target = el.querySelector(".hero-name");
    if (!target) return;
    ro = new ResizeObserver(invalidate);
    ro.observe(target);
  };

  const resetToNatural = (el: HTMLElement) => {
    el.style.position = "relative";
    el.style.left = "";
    el.style.top = "";
    el.style.width = "100%";
    el.style.height = "";
    el.style.transform = "";
    el.style.transformOrigin = "";
    el.style.padding = "";
    el.style.alignItems = "";
    el.style.justifyContent = "";
    const l1 = el.querySelector<HTMLElement>(".hero-line-1");
    const l2 = el.querySelector<HTMLElement>(".hero-line-2");
    if (l1) l1.style.fontSize = "";
    if (l2) l2.style.fontSize = "";
    const name = el.querySelector<HTMLElement>(".hero-name");
    const soc = el.querySelector<HTMLElement>(".hero-socials");
    if (name) name.style.transform = "";
    if (soc) {
      soc.style.transform = "";
      soc.style.gap = "";
    }
  };

  const apply = (el: HTMLElement, t: number) => {
    if (t === lastT) return;
    lastT = t;

    const vw = window.innerWidth;

    // Fixed from the very first frame — no flow-collapse flip mid-morph.
    el.style.position = "fixed";
    el.style.left = "0";
    el.style.top = "0";
    el.style.height = "100dvh";
    el.style.transformOrigin = "top left";

    // Hero box: width lerps 100% -> 38%
    const widthPct = lerp(100, 38, t);
    el.style.width = `${widthPct}%`;

    // Padding lerps (2rem symmetric) -> (3rem flex-start docked)
    const padLR = lerp(2, 3, t);
    const padTB = lerp(2, 3, t);
    el.style.padding = `${padTB}rem ${padLR}rem`;

    // Always anchor inner text to the left; fake horizontal centering at t=0
    // via translateX on the name + socials as one unit.
    el.style.alignItems = "flex-start";
    el.style.justifyContent = "center";

    if (!textBlock) {
      textBlock = el.querySelector(".hero-name") as HTMLElement | null;
    }

    const name = textBlock;
    const soc = el.querySelector<HTMLElement>(".hero-socials");
    if (name) {
      const textWidth = name.offsetWidth;
      const heroW0 = vw; // hero width at t=0 (100%)
      const heroW1 = 0.38 * vw; // hero width at t=1 (38%)
      const padL0 = 2 * 16; // 2rem padding at t=0
      // At t=0 the name is centred inside the hero's *content* box (hero width
      // minus padding), so it is exactly viewport-centred regardless of the
      // measured text width. At t=1 it sits at the docked offset (heroW1 slack).
      // Both share the same current text width, so the glide is continuous.
      const slackAt0 = Math.max(heroW0 - 2 * padL0 - textWidth, 0);
      const slackAt1 = Math.max(heroW1 - textWidth, 0);
      const tx = lerp(slackAt0, slackAt1, t) / 2;
      name.style.transform = `translateX(${tx}px)`;
      if (soc) soc.style.transform = `translateX(${tx}px)`;
    }

    // Font-size lerp for the two hero lines
    const vwScale = vw / 100;
    const minBig1 = 3.5, maxBig1 = 11;
    const minSmall1 = 2.5, maxSmall1 = 6;
    const big1 = clamp(12 * vwScale, minBig1, maxBig1);
    const small1 = clamp(5 * vwScale, minSmall1, maxSmall1);
    const l1 = el.querySelector<HTMLElement>(".hero-line-1");
    if (l1) l1.style.fontSize = `${lerp(big1, small1, t)}rem`;

    const minBig2 = 2, maxBig2 = 7;
    const minSmall2 = 1.5, maxSmall2 = 4;
    const big2 = clamp(7 * vwScale, minBig2, maxBig2);
    const small2 = clamp(3.5 * vwScale, minSmall2, maxSmall2);
    const l2 = el.querySelector<HTMLElement>(".hero-line-2");
    if (l2) l2.style.fontSize = `${lerp(big2, small2, t)}rem`;

    // Socials gap lerps to tighter when docked
    if (soc) soc.style.gap = `${lerp(2, 1.5, t)}rem`;
  };

  const tick = () => {
    raf = requestAnimationFrame(tick);
    const el = heroRef.value;
    if (!el) return;
    ensureObserver(el);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (window.innerWidth < minViewportWidth) {
      if (lastT !== 0) {
        lastT = 0;
        resetToNatural(el);
      }
      return;
    }

    let scrollY = window.scrollY;
    try {
      const lenis = (window as any).__lenis;
      if (lenis && typeof lenis.scroll === "number") scrollY = lenis.scroll;
    } catch (_) {}

    const end = endY ?? window.innerHeight;
    const raw = clamp((scrollY - startY) / (end - startY), 0, 1);
    const t = easeOutCubic(raw);
    apply(el, t);
  };

  onMounted(() => {
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", invalidate, { passive: true });
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(invalidate).catch(() => {});
    }
  });

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", invalidate);
    if (ro) ro.disconnect();
    ro = null;
    textBlock = null;
  });
}
