import { onMounted, onBeforeUnmount } from "vue";

/**
 * Fade-up scroll reveal for case-study pages. Watches every [data-reveal]
 * element, adds `.is-in` the first time it enters the viewport, then stops
 * observing it. Elements are hidden purely in CSS (opacity/translate), so
 * `prefers-reduced-motion` or a missing IntersectionObserver just leaves them
 * visible — no scroll listeners, no rAF loop.
 */
export function useScrollReveal(selector = "[data-reveal]") {
  let observer: IntersectionObserver | null = null;

  const show = (el: Element) => el.classList.add("is-in");

  onMounted(() => {
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll<HTMLElement>(selector).forEach(show);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll<HTMLElement>(selector).forEach(show);
      return;
    }
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll<HTMLElement>(selector).forEach((el) =>
      observer!.observe(el)
    );
  });

  onBeforeUnmount(() => observer?.disconnect());
}
