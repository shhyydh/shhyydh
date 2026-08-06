<template>
  <aside
    ref="el"
    class="hero-shell"
    :data-state="state"
    :style="{ viewTransitionName: state === 'sidebar' ? 'hero-sidebar' : 'hero-home' }"
  >
    <NuxtLink
      to="/"
      class="hero-back"
      aria-label="Back to home"
      @click="onBack"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
           stroke-linejoin="round">
        <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
      </svg>
    </NuxtLink>

    <div class="hero-name">
      <div class="hero-line-1">Hi.</div>
      <div class="hero-line-2">I'm Shahid</div>
    </div>

    <nav class="hero-socials" aria-label="Social links">
      <a
        v-for="s in socials"
        :key="s.label"
        :href="s.href"
        :target="s.href.startsWith('http') ? '_blank' : undefined"
        rel="noreferrer"
        :aria-label="s.label"
      >
        <Icon :name="s.icon" />
      </a>
    </nav>

    <div class="hero-scroll" aria-hidden="true">scroll :)</div>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps<{
  state: "index" | "sidebar";
}>();

const emit = defineEmits<{ (e: "back"): void }>();

const el = ref<HTMLElement | null>(null);

// expose ref so parent (pages/index.vue) can pass it to useHeroMorph
defineExpose({ el });

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/shhyd",
    icon: "simple-icons:github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shhyd",
    icon: "simple-icons:linkedin",
  },
  {
    label: "Substack",
    href: "https://shhyd.substack.com",
    icon: "simple-icons:substack",
  },
  {
    label: "Email",
    href: "mailto:hello@shhyd.dev",
    icon: "mdi:email",
  },
];

const onBack = () => emit("back");
</script>

<style scoped>
.hero-shell {
  /* Fully transparent — no surface over the fixed HexPattern texture. The
     index state is already transparent; the sidebar rail now is too. */
  background: transparent;
  z-index: 30;
  display: flex;
  box-sizing: border-box;
  will-change: transform, width, opacity;

  /* Natural in-flow state (also used at t=0 / scrollY=0 on the home page).
     The useHeroMorph composable overrides these inline as the user scrolls. */
  position: relative;
  top: auto; left: auto;
  width: 100%;
  height: 100dvh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
}

/* state 1 — home page. The shell is a transparent full-viewport overlay that
   never shrinks: useHeroMorph moves only the name + socials. pointer-events
   pass through so the (gated) timeline content and its links stay clickable. */
.hero-shell[data-state="index"] {
  background: transparent;
  pointer-events: none;
}
.hero-shell[data-state="index"] .hero-socials {
  pointer-events: auto;
}

/* state 2 — slim vertical navbar. Used on /projects/:slug routes.
   Injected by the parent via :state="sidebar".
   The useHeroMorph composable doesn't touch this state.
   No border rail — the rail floats transparent over the HexPattern; the pages
   offset their content by 60px (48px rail + 12px breathing strip). */
.hero-shell[data-state="sidebar"] {
  position: fixed;
  top: 0; left: 0;
  width: 48px;
  height: 100dvh;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
}

.hero-back {
  opacity: 0;
  pointer-events: none;
  color: var(--color-ink);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid transparent;
  box-sizing: border-box;
  /* Calm, colour-only interaction — no scale, no translate, no ring. */
  transition: opacity 0.35s ease, background-color 0.3s ease, color 0.3s ease;
  order: -1;
}
.hero-shell[data-state="sidebar"] .hero-back {
  opacity: 1;
  pointer-events: auto;
}
.hero-back:hover {
  background-color: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
  color: #fff;
}
.hero-shell[data-state="sidebar"] .hero-back svg {
  width: 22px;
  height: 22px;
}

.hero-name {
  display: flex;
  flex-direction: column;
  line-height: 0.9;
  letter-spacing: -0.04em;
  font-family: var(--font-sans);
  /* default font sizes via clamp; JS overrides during morph */
  align-items: flex-start;
}
.hero-line-1 {
  font-weight: 800;
  font-size: clamp(3.5rem, 12vw, 11rem);
}
.hero-line-2 {
  font-weight: 700;
  font-size: clamp(2rem, 7vw, 7rem);
  margin-top: 0.25rem;
}

.hero-shell[data-state="sidebar"] .hero-name {
  /* Third state: the name shrinks toward the side and fades off; the socials
     re-orient from a horizontal row into a tighter vertical stack below. */
  opacity: 0;
  transform: translateX(-24px) scale(0.94);
  pointer-events: none;
  transition: opacity 0.45s var(--ease-dock), transform 0.5s var(--ease-dock);
}

/* "scroll :)" hint under the social icons — no animation, no fade, no shrink on the
   STYLING; only its TEXT is typed out (typewriter) by useHeroMorph as the user moves
   through the page (scroll :) → scroll slow :) → stop scrolling :). It rides with
   the name + socials block during the dock so it stays aligned. Hidden in the sidebar. */
.hero-scroll {
  font-family: var(--font-mono);
  font-size: 1.05rem;
  letter-spacing: 0.18em;
  color: rgba(0, 0, 0, 0.5);
}
.hero-shell[data-state="sidebar"] .hero-scroll {
  display: none;
}

.hero-socials {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  /* Icon size: the iconify spans are 1em-based, so the row's font-size drives the
     solid icons (anchors inherit). useHeroMorph lerps this inline 38px → 30px. */
  font-size: 38px;
}
.hero-socials a {
  color: var(--color-ink);
  transition: color 0.3s ease;
  display: inline-flex;
  line-height: 0;
}
.hero-socials :deep(a):hover { color: var(--color-accent-hover); }
.hero-shell[data-state="sidebar"] .hero-socials {
  flex-direction: column;
  gap: 1rem;
  font-size: 22px;
}
.hero-shell[data-state="sidebar"] .hero-socials a {
  color: var(--color-accent-hover);
  /* Soft white halo so the icons lift off the transparent rail / HexPattern. */
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.85));
}
.hero-shell[data-state="sidebar"] .hero-socials a:hover {
  color: var(--color-ink);
}

/* mobile — hero always in natural relative centered state, no morph */
@media (max-width: 767px) {
  .hero-shell,
  .hero-shell[data-state="sidebar"] {
    position: relative !important;
    top: auto !important; left: auto !important;
    width: 100% !important;
    height: auto !important;
    min-height: 70dvh;
    transform: none !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 1.5rem !important;
    padding: 2rem 1.5rem !important;
    border-right: none !important;
  }
  .hero-shell[data-state="sidebar"] .hero-name {
    opacity: 1 !important;
    transform: none !important;
    pointer-events: auto !important;
  }
  .hero-shell[data-state="sidebar"] .hero-back {
    display: none !important;
  }
  .hero-shell .hero-socials,
  .hero-shell[data-state="sidebar"] .hero-socials {
    flex-direction: row !important;
    gap: 1.5rem !important;
    font-size: 38px !important;
  }
  .hero-line-1 { font-size: clamp(3rem, 14vw, 5rem) !important; }
  .hero-line-2 { font-size: clamp(1.75rem, 8vw, 3rem) !important; }
}
</style>
