import { onMounted, onBeforeUnmount } from "vue";

export function useTimelineReveal(scrollSelector = "[data-timeline-scroll]") {
  let ticking = false;
  let containers: HTMLElement[] = [];

  const updateItem = (el: HTMLElement, rect: DOMRect) => {
    const vh = window.innerHeight;
    const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
    if (visible <= 0) {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      return;
    }
    const frac = Math.min(visible / (rect.height || 1), 1);
    const opacity = String(Math.min(1.5 * frac, 1));
    const ty = (1 - frac) * 20;
    el.style.opacity = opacity;
    el.style.transform = `translateY(${ty}px)`;
  };

  // Measure every item first, then write: interleaving a rect read with a style
  // write per item forced a style recalc for each item on every scroll frame.
  const updateAll = () => {
    ticking = false;
    const items = Array.from(
      document.querySelectorAll<HTMLElement>("[data-timeline-item]")
    );
    const rects = items.map((el) => el.getBoundingClientRect());
    items.forEach((el, i) => updateItem(el, rects[i]));
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateAll);
    }
  };

  const bindContainers = () => {
    containers = Array.from(
      document.querySelectorAll<HTMLElement>(scrollSelector)
    );
    containers.forEach((c) =>
      c.addEventListener("scroll", onScroll, { passive: true })
    );
  };

  onMounted(() => {
    // mobile: every scroll frame rewrites inline opacity/transform on ALL
    // timeline items (a per-item lerp towards the viewport centre), which on
    // phones shows up as a stuck/docking stutter. Fall back to a native,
    // plain scroll — the items are simply always visible.
    if (window.matchMedia("(max-width: 767px)").matches) {
      document
        .querySelectorAll<HTMLElement>("[data-timeline-item]")
        .forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "";
        });
      return;
    }
    bindContainers();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    requestAnimationFrame(updateAll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    containers.forEach((c) => c.removeEventListener("scroll", onScroll));
  });
}
