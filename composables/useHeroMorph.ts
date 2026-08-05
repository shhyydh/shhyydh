import { onMounted, onBeforeUnmount, type Ref } from "vue";

/**
 * Continuous scroll-linked hero morph — vanilla JS, no animation library.
 *
 * Rev 4 — text-only transform, content scrolls in after the dock:
 *   - The hero shell is ALWAYS `position: fixed` (top:0 left:0, width:100%)
 *     on desktop, from the first rAF tick, and stays full-viewport and
 *     TRANSPARENT for the whole morph — it never shrinks, so there is no
 *     white box collapsing beside the content.
 *   - Only the text block (`.hero-name`) and the socials row (`.hero-socials`)
 *     translate as one unit from viewport-centre to the docked position,
 *     gliding on `easeOutCubic`.
 *   - The page content (`.timeline-column`) is held below the fold purely in
 *     CSS (`margin-top: 200dvh` at ≥768px in pages/index.vue): it cannot be
 *     seen during the morph and, once the dock completes, it scrolls up from
 *     the bottom of the viewport like normal page content — no JS opacity gate.
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
  let lastLabel = "scroll :)";
  let typeTimer: ReturnType<typeof setInterval> | null = null;
  let endNoteTop = NaN;
  let textBlock: HTMLElement | null = null;
  let ro: ResizeObserver | null = null;

  // Force a recompute on the next tick (viewport/font metrics changed).
  const invalidate = () => {
    lastT = -1;
    endNoteTop = NaN;
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

  const stopTyping = () => {
    if (typeTimer) {
      clearInterval(typeTimer);
      typeTimer = null;
    }
  };

  // Typewriter: clear the hint then reveal the new label one character at a time.
  // Fast (35ms/char) so the label swap feels snappy rather than instant.
  const typeLabel = (el: HTMLElement, label: string) => {
    stopTyping();
    const scrollHint = el.querySelector<HTMLElement>(".hero-scroll");
    if (!scrollHint) return;
    scrollHint.textContent = "";
    let i = 0;
    typeTimer = setInterval(() => {
      i++;
      scrollHint.textContent = label.slice(0, i);
      if (i >= label.length) stopTyping();
    }, 35);
  };

  const resetToNatural = (el: HTMLElement) => {
    el.style.position = "";
    el.style.left = "";
    el.style.top = "";
    el.style.width = "";
    el.style.height = "";
    el.style.transformOrigin = "";
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
      soc.style.fontSize = "";
    }
    const scroll = el.querySelector<HTMLElement>(".hero-scroll");
    if (scroll) {
      stopTyping();
      scroll.style.transform = "";
      scroll.textContent = "scroll :)";
    }
    lastLabel = "scroll :)";
  };

  const apply = (el: HTMLElement, t: number) => {
    if (t === lastT) return;
    lastT = t;

    const vw = window.innerWidth;

    // Fixed full-viewport shell — never shrinks, never moves. The transparent
    // background for the index state is applied by Hero.vue, not here.
    el.style.position = "fixed";
    el.style.left = "0";
    el.style.top = "0";
    el.style.width = "100%";
    el.style.height = "100dvh";
    el.style.alignItems = "flex-start";
    el.style.justifyContent = "center";

    if (!textBlock) {
      textBlock = el.querySelector(".hero-name") as HTMLElement | null;
    }

    const name = textBlock;
    const soc = el.querySelector<HTMLElement>(".hero-socials");
    const scroll = el.querySelector<HTMLElement>(".hero-scroll");
    if (name) {
      const textWidth = name.offsetWidth;
      const heroW0 = vw; // anchor at t=0: the full viewport
      const heroW1 = 0.38 * vw; // anchor at t=1: the docked 38% region
      const padL = 2 * 16; // constant 2rem shell padding
      // t=0: name centred in the viewport content box — exactly viewport-centred
      // regardless of the measured text width. t=1: name at the docked offset,
      // the same spot the old 38% box ended up at (+16px because the shell
      // padding stays 2rem instead of lerping to 3rem). The glide is continuous.
      const tx0 = Math.max(heroW0 - 2 * padL - textWidth, 0) / 2;
      const tx1 = Math.max(heroW1 - textWidth, 0) / 2 + 16;
      const tx = lerp(tx0, tx1, t);
      name.style.transform = `translateX(${tx}px)`;
      if (soc) soc.style.transform = `translateX(${tx}px)`;
      // "scroll :)" rides the block purely for alignment (no fade, no shrink,
      // no bounce). Its TEXT changes with page progress — see tick() below.
      if (scroll) scroll.style.transform = `translateX(${tx}px)`;
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

    // Solid icons shrink with the text so the whole block feels like one unit:
    // font-size on the socials row drives the (1em-based) iconify spans.
    if (soc) soc.style.fontSize = `${lerp(38, 30, t)}px`;
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

    // Scroll-hint label transforms as the user moves through the page,
    // typed out with a fast typewriter animation:
    //   hero (before the dock)  → "scroll :)"
    //   docked, in the timeline → "scroll slow :)"
    //   final viewport of scroll → "stop scrolling :)"
    const scroller = document.scrollingElement || document.documentElement;
    const maxScroll = Math.max(0, scroller.scrollHeight - window.innerHeight);
    let label = "scroll :)";
    if (scrollY >= end) label = "scroll slow :)";
    // "stop scrolling :)" only as the end-of-content note enters the viewport —
    // the old threshold (last full viewport) fired ~600px too early.
    if (maxScroll > 0) {
      if (Number.isNaN(endNoteTop)) {
        const note = document.querySelector(".end-note");
        endNoteTop = note
          ? note.getBoundingClientRect().top + window.scrollY
          : NaN;
      }
      const stopY = Number.isNaN(endNoteTop)
        ? maxScroll - Math.max(240, Math.round(window.innerHeight * 0.3))
        : endNoteTop - window.innerHeight * 0.95;
      if (scrollY >= Math.min(Math.max(stopY, end), maxScroll)) label = "stop scrolling :)";
    }
    if (label !== lastLabel) {
      lastLabel = label;
      typeLabel(el, label);
    }
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
    stopTyping();
    window.removeEventListener("resize", invalidate);
    if (ro) ro.disconnect();
    ro = null;
    textBlock = null;
  });
}
