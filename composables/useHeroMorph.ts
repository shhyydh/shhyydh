import { onMounted, onBeforeUnmount, type Ref } from "vue";

/**
 * Continuous scroll-linked hero morph — vanilla JS, no animation library.
 *
 * Rev 5 — text-only transform, content scrolls in after the dock:
 *   - The hero shell is `position: fixed` (top:0 left:0, width:100%) on
 *     desktop in CSS (Hero.vue), including at rest. It stays full-viewport and
 *     TRANSPARENT for the whole morph, and because it never enters the page
 *     flow, the page height doesn't jump when the morph engages.
 *   - Only the text block (`.hero-block` — name, socials and scroll hint) moves
 *     as one unit from viewport-centre to the docked position, gliding on
 *     `easeOutCubic`.
 *   - The page content (`.timeline-column`) is held below the fold purely in
 *     CSS (`margin-top: 200dvh` at ≥768px in pages/index.vue): it cannot be
 *     seen during the morph and, once the dock completes, it scrolls up from
 *     the bottom of the viewport like normal page content — no JS opacity gate.
 *   - Work happens only on scroll/resize (one rAF per event burst), not in a
 *     perpetual loop. Each tick does all layout reads before any style writes,
 *     and centring uses a % translate, so there's no forced layout per frame.
 *   - `prefers-reduced-motion` and viewports < `minViewportWidth` fall back to
 *     the natural CSS state (relative, centered, full-width, in page flow).
 */

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(Math.max(v, lo), hi);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// Docked layout is a consistent grid on the home page:
//   name (left edge at --dock-gutter) | gap | spine | gap | timeline content
// The page gutter is shared with the content column's right padding, so the
// left and right margins align, and the two gaps are identical (both
// --dock-gap). The docked name width is measured and published to CSS as
// --dock-name-width so the spine/content track it exactly.
const DOCK_GUTTER = 6 * 16; // 6rem — matches .timeline-column right padding
const DOCK_GAP = 3 * 16; // 3rem — matches --dock-gap in pages/index.vue

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
  let dockNameWidth = "";
  let reduceMotion: MediaQueryList | null = null;

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
    const block = el.querySelector<HTMLElement>(".hero-block");
    const soc = el.querySelector<HTMLElement>(".hero-socials");
    if (block) block.style.transform = "";
    if (soc) {
      soc.style.gap = "";
      soc.style.fontSize = "";
    }
    const scroll = el.querySelector<HTMLElement>(".hero-scroll");
    if (scroll) {
      stopTyping();
      scroll.textContent = "scroll :)";
    }
    lastLabel = "scroll :)";
  };

  // vw: viewport width incl. scrollbar (what CSS `vw` uses, for the font clamps).
  // shellW: the fixed shell's width, excl. a classic scrollbar (for centring).
  const apply = (el: HTMLElement, t: number, vw: number, shellW: number) => {
    if (t === lastT) return;
    lastT = t;

    // Fixed full-viewport shell — never shrinks, never moves. The transparent
    // background for the index state is applied by Hero.vue, not here.
    el.style.position = "fixed";
    el.style.left = "0";
    el.style.top = "0";
    el.style.width = "100%";
    el.style.height = "100dvh";
    el.style.alignItems = "flex-start";
    el.style.justifyContent = "center";

    const padL = 2 * 16; // constant 2rem shell padding
    const block = el.querySelector<HTMLElement>(".hero-block");
    if (block) {
      // t=0: the text block (name + socials + scroll hint, riding as ONE unit)
      // centred in the shell — shift to the shell centre, then back by half the
      // block's own width (the % term), so no width measurement is needed.
      // t=1: docked at the shared page gutter, so its left edge lines up with the
      // content column's right margin. The glide is continuous between the two.
      const tx = lerp(shellW / 2 - padL, DOCK_GUTTER - padL, t);
      block.style.transform = `translateX(${tx}px) translateX(${-50 * (1 - t)}%)`;
    }

    // Font-size lerp for the two hero lines. Mirrors Hero.vue's
    // clamp(3.5rem, 12vw, 11rem) etc., so vwScale is 1vw expressed in rem — in
    // px it always hit the max clamp, and on viewports under ~1470px the text
    // jumped in size on the first scrolled pixel.
    const vwScale = vw / 100 / 16;
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

    // Solid icons shrink with the text so the whole block feels like one unit:
    // font-size on the socials row drives the (1em-based) iconify spans.
    if (soc) soc.style.fontSize = `${lerp(38, 30, t)}px`;

    // Publish the DOCKED name width so .timeline-column can align its left
    // padding and the spine to it. Only at t=1 and only when it changes: a
    // custom property on :root restyles the whole page, so writing it every
    // morph frame was a big part of the scroll jank. Content is below the fold
    // until the dock completes, so it never sees the pre-dock fallback.
    if (t === 1) {
      const name = el.querySelector<HTMLElement>(".hero-name");
      const w = name ? `${name.offsetWidth}px` : "";
      if (w && w !== dockNameWidth) {
        dockNameWidth = w;
        document.documentElement.style.setProperty("--dock-name-width", w);
      }
    }
  };

  const tick = () => {
    raf = 0;
    const el = heroRef.value;
    if (!el) return;

    if (reduceMotion?.matches || window.innerWidth < minViewportWidth) {
      if (lastT !== 0) {
        lastT = 0;
        resetToNatural(el);
      }
      return;
    }

    // Layout reads first — nothing below reads layout after the style writes.
    const scrollY = window.scrollY;
    const vw = window.innerWidth;
    const shellW = document.documentElement.clientWidth;
    const scroller = document.scrollingElement || document.documentElement;
    const maxScroll = Math.max(0, scroller.scrollHeight - window.innerHeight);
    if (Number.isNaN(endNoteTop)) {
      const note = document.querySelector(".end-note");
      endNoteTop = note ? note.getBoundingClientRect().top + scrollY : NaN;
    }

    const end = endY ?? window.innerHeight;
    const raw = clamp((scrollY - startY) / (end - startY), 0, 1);
    if (raw <= 0) {
      // At rest (scrollY 0) leave the hero in its pure natural CSS state — no
      // inline overrides at all. The t=0 morph styles are pixel-identical to
      // that natural state anyway, so the dock engages invisibly on the first
      // scroll frame.
      if (lastT !== 0) {
        lastT = 0;
        resetToNatural(el);
      }
      return;
    }
    apply(el, easeOutCubic(raw), vw, shellW);

    // Scroll-hint label transforms as the user moves through the page,
    // typed out with a fast typewriter animation:
    //   hero (before the dock)  → "scroll :)"
    //   docked, in the timeline → "scroll slow :)"
    //   final viewport of scroll → "stop scrolling :)"
    let label = "scroll :)";
    if (scrollY >= end) label = "scroll slow :)";
    // "stop scrolling :)" only as the end-of-content note enters the viewport —
    // the old threshold (last full viewport) fired ~600px too early.
    if (maxScroll > 0) {
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

  // One tick per frame at most, and only when something changed.
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  // Force a full recompute (viewport/font metrics changed).
  const invalidate = () => {
    lastT = -1;
    endNoteTop = NaN;
    schedule();
  };

  onMounted(() => {
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotion.addEventListener?.("change", invalidate);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", invalidate, { passive: true });
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(invalidate).catch(() => {});
    }
    schedule();
  });

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf);
    raf = 0;
    stopTyping();
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", invalidate);
    reduceMotion?.removeEventListener?.("change", invalidate);
  });
}
