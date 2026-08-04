import { onMounted, onBeforeUnmount } from "vue";

export function useTimelineReveal(scrollSelector = "[data-timeline-scroll]") {
  let ticking = false;
  let containers: HTMLElement[] = [];

  const updateItem = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    if (window.matchMedia("(max-width: 767px)").matches) {
      const center = (rect.top + rect.bottom) / 2;
      const denom = vh * 0.75 || 1;
      const t = Math.min(Math.max(Math.abs(center - vh / 2) / denom, 0), 1);
      const opacity = String(1 - t);
      const ty = t * 20;
      el.style.opacity = opacity;
      el.style.transform = `translateY(${ty}px)`;
      return;
    }

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

  const updateAll = () => {
    ticking = false;
    document
      .querySelectorAll<HTMLElement>("[data-timeline-item]")
      .forEach(updateItem);
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
