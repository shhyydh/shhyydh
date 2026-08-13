import { onMounted, onBeforeUnmount } from "vue";

/**
 * Fade-up scroll reveal for long-form prose. The whole article can't be one
 * [data-reveal] block — useScrollReveal's 0.12 threshold can't be met by a
 * single element taller than the viewport, so it would stay hidden forever.
 * Instead this reveals each block of the rendered content one at a time as it
 * enters the viewport.
 *
 * Blocks are hidden only in onMounted (same tick as hydration, so there's no
 * flash of content), and prefers-reduced-motion / missing IntersectionObserver
 * just leave everything visible.
 */
export function useProseReveal(selector = ".blog-prose") {
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    const root = document.querySelector<HTMLElement>(selector);
    if (!root) return;
    const wrapper = root.firstElementChild as HTMLElement | null;
    const blocks = Array.from((wrapper?.children ?? root.children) as HTMLCollectionOf<HTMLElement>);
    if (!blocks.length) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    blocks.forEach((block) => block.classList.add("prose-reveal"));
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    blocks.forEach((block) => observer!.observe(block));
  });

  onBeforeUnmount(() => observer?.disconnect());
}
