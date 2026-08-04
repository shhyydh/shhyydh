<template>
  <aside
    ref="el"
    class="hero-shell"
    :data-state="state"
    style="view-transition-name: hero"
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
      <div class="hero-line-1">hi.</div>
      <div class="hero-line-2">I'm shhyd</div>
    </div>

    <nav class="hero-socials" aria-label="Social links">
      <a
        v-for="s in socials"
        :key="s.label"
        :href="s.href"
        :target="s.href.startsWith('http') ? '_blank' : undefined"
        rel="noreferrer"
        :aria-label="s.label"
        v-html="s.svg"
      />
    </nav>
  </aside>
</template>

<script setup lang="ts">
import type { Ref } from "vue";

const props = defineProps<{
  state: "centered" | "docked" | "sidebar";
}>();

const emit = defineEmits<{ (e: "back"): void }>();

const el = ref<HTMLElement | null>(null) as Ref<HTMLElement | null>;

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/shhyd",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shhyd",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
  },
  {
    label: "Email",
    href: "mailto:hello@shhyd.dev",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>`,
  },
];

const onBack = () => emit("back");
</script>

<style scoped>
.hero-shell {
  background: var(--color-bg);
  z-index: 30;
  display: flex;
  box-sizing: border-box;
  transition:
    top 0.5s var(--ease-dock),
    left 0.5s var(--ease-dock),
    width 0.5s var(--ease-dock),
    height 0.5s var(--ease-dock),
    transform 0.5s var(--ease-dock),
    opacity 0.45s var(--ease-dock),
    padding 0.5s var(--ease-dock),
    flex-direction 0s,
    align-items 0.5s var(--ease-dock),
    justify-content 0.5s var(--ease-dock);
  will-change: transform, opacity;
}

/* state 0 — centered, IN-NORMAL-FLOW so page can scroll past it */
.hero-shell[data-state="centered"] {
  position: relative;
  top: 0; left: 0;
  width: 100%;
  height: 100dvh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
}

/* state 1 — docked left, FIXED so it sticks while page scrolls */
.hero-shell[data-state="docked"] {
  position: fixed;
  top: 0; left: 0;
  width: 38%;
  height: 100dvh;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 3rem;
}

/* state 2 — slim vertical navbar on the left */
.hero-shell[data-state="sidebar"] {
  position: fixed;
  top: 0; left: 0;
  width: 88px;
  height: 100dvh;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
}

.hero-back {
  opacity: 0;
  pointer-events: none;
  color: var(--color-ink);
  transition: opacity 0.4s var(--ease-dock) 0.1s, transform 0.4s var(--ease-dock) 0.1s;
  display: flex;
  order: -1;
  transform: translateY(-4px) scale(0.8);
}
.hero-shell[data-state="sidebar"] .hero-back {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0) scale(1);
}
.hero-back:hover { color: var(--color-accent-hover); }

.hero-name {
  display: flex;
  flex-direction: column;
  line-height: 0.9;
  letter-spacing: -0.04em;
  transition: opacity 0.45s var(--ease-dock), transform 0.5s var(--ease-dock);
}
.hero-line-1 {
  font-weight: 800;
  font-size: clamp(3.5rem, 12vw, 11rem);
  transition: font-size 0.5s var(--ease-dock);
}
.hero-line-2 {
  font-weight: 700;
  font-size: clamp(2rem, 7vw, 7rem);
  margin-top: 0.25rem;
  transition: font-size 0.5s var(--ease-dock);
}
.hero-shell[data-state="docked"] .hero-line-1 { font-size: clamp(2.5rem, 5vw, 6rem); }
.hero-shell[data-state="docked"] .hero-line-2 { font-size: clamp(1.5rem, 3.5vw, 4rem); }
.hero-shell[data-state="sidebar"] .hero-name {
  opacity: 0;
  transform: translateX(-30px);
  pointer-events: none;
}

.hero-socials {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  transition: flex-direction 0s, gap 0.5s var(--ease-dock);
}
.hero-socials :deep(a) {
  color: var(--color-ink);
  transition: color 0.3s ease, transform 0.3s ease;
  display: inline-flex;
  line-height: 0;
}
.hero-socials :deep(a):hover { color: var(--color-accent-hover); }
.hero-shell[data-state="docked"] .hero-socials { gap: 1.5rem; }
.hero-shell[data-state="sidebar"] .hero-socials {
  flex-direction: column;
  gap: 1.25rem;
}

/* mobile — hero is normal-flow centered at top of page, no docking/sidebar morph */
@media (max-width: 767px) {
  .hero-shell,
  .hero-shell[data-state="docked"],
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
  .hero-shell[data-state="docked"] .hero-socials,
  .hero-shell[data-state="sidebar"] .hero-socials {
    flex-direction: row !important;
    gap: 1.5rem !important;
  }
  .hero-line-1 { font-size: clamp(3rem, 14vw, 5rem) !important; }
  .hero-line-2 { font-size: clamp(1.75rem, 8vw, 3rem) !important; }
}
</style>
