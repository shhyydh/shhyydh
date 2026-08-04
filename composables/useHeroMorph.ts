import { onMounted, onBeforeUnmount, type Ref } from "vue";

/**
 * Continuous scroll-linked hero morph — vanilla JS, no animation library.
 * Replaces the old threshold-snap (centered <-> docked) with a continuous
 * lerp driven by scrollY each rAF tick.
 *
 * Strategy:
 *   - The hero element keeps align-items: flex-start; justify-content: center
 *     always (text anchored to the left, vertically centered).
 *   - At t=0 the hero is full-width and the inner text is translated right
 *     by ~50% of the hero width minus half the text width — faking centering.
 *   - As t→1 the hero width shrinks to 38% (docked width) and the inner
 *     translate lerps to 0, so the text glides from center of screen to
 *     top-left corner.
 *   - The hero becomes position: fixed once t > 0.001 so it docks without
 *     collapsing the document height; the page-root retains its min-height
 *     so the scroll range doesn't shrink.
 */

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(Math.max(v, lo), hi);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

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
    if (textBlock) textBlock.style.transform = "";
    const l1 = el.querySelector<HTMLElement>(".hero-line-1");
    const l2 = el.querySelector<HTMLElement>(".hero-line-2");
    if (l1) l1.style.fontSize = "";
    if (l2) l2.style.fontSize = "";
    const soc = el.querySelector<HTMLElement>(".hero-socials");
    if (soc) soc.style.gap = "";
  };

  const apply = (el: HTMLElement, t: number) => {
    if (t === lastT) return;
    lastT = t;

    if (t <= 0.001) {
      resetToNatural(el);
      return;
    }

    // Measure the text block once (lazy)
    if (!textBlock) {
      textBlock = el.querySelector(".hero-name") as HTMLElement | null;
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Hero box: width lerps 100% -> 38%, position becomes fixed
    el.style.position = "fixed";
    el.style.left = "0";
    el.style.top = "0";
    el.style.height = "100dvh";
    el.style.transformOrigin = "top left";
    el.style.transform = "";

    const widthPct = lerp(100, 38, t);
    el.style.width = `${widthPct}%`;

    // Padding lerps (2rem symmetric centered) -> (3rem flex-start docked)
    const padLR = lerp(2, 3, t);
    const padTB = lerp(2, 3, t);
    el.style.padding = `${padTB}rem ${padLR}rem`;

    // Always anchor inner text to the left so width-shrink drives the move;
    // fake horizontal centering at t=0 via translateX on the text block.
    el.style.alignItems = "flex-start";
    el.style.justifyContent = "center";

    if (textBlock) {
      // At t=0 the hero is full-width; we want the text visually centered.
      // At t=1 the text should sit flush-left.
      // translateX goes from (vw - textWidth) / 2 (in px) → 0.
      const textWidth = textBlock.offsetWidth;
      const heroWidthPx = (widthPct / 100) * vw;
      // The slack between hero width and text width:
      const slackAt0 = Math.max(vw - textWidth, 0);
      const slackAt1 = Math.max(heroWidthPx - textWidth, 0);
      const slackNow = lerp(slackAt0, slackAt1, t);
      // text is anchored at left of the (current-width) hero; to center it
      // within the hero at any t we add slackNow/2
      const tx = slackNow / 2;
      // But we want it centered in the *viewport* at t=0, not in the hero.
      // At t=0 hero width = viewport width, so viewport-center == hero-center — perfect.
      // At t=1 we want flush-left of docked-hero, which is vx=0 — tx=0.
      textBlock.style.transform = `translateX(${tx}px)`;
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
    const soc = el.querySelector<HTMLElement>(".hero-socials");
    if (soc) soc.style.gap = `${lerp(2, 1.5, t)}rem`;
  };

  const tick = () => {
    raf = requestAnimationFrame(tick);
    const el = heroRef.value;
    if (!el) return;

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
    const t = easeInOutCubic(raw);
    apply(el, t);
  };

  onMounted(() => {
    raf = requestAnimationFrame(tick);
  });

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf);
    textBlock = null;
  });
}
