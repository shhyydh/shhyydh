import { ref, onMounted, onBeforeUnmount } from "vue";

export type DockState = "centered" | "docked";

export function useScrollDock(threshold = 0.85) {
  const state = ref<DockState>("centered");
  let ticking = false;

  const compute = () => {
    ticking = false;
    const vh = window.innerHeight;
    state.value = window.scrollY >= vh * threshold ? "docked" : "centered";
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(compute);
    }
  };

  onMounted(() => {
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
  });

  return state;
}
