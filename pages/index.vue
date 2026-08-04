<template>
  <div class="page-root">
    <Hero ref="hero" state="index" @back="goHome" />

    <!-- TEMP (2026-08-05): timeline content commented out while the hero section is
         being finished. .hero-scroll-spacer keeps the page scrollable so the dock
         morph stays testable. Restore the timeline block and delete the spacer when
         real content arrives. -->
    <div class="hero-scroll-spacer" aria-hidden="true" />

    <!--
    <section class="timeline-column">
      <p
        data-timeline-item
        class="intro"
      >
        {{ intro }}
      </p>
      <Timeline :groups="groups" />
      <div class="footer-spacer" />
    </section>
    -->
  </div>
</template>

<script setup lang="ts">
import { useHeroMorph } from "~/composables/useHeroMorph";
// TEMP: useTimelineReveal commented out with the timeline block below.
// import { useTimelineReveal } from "~/composables/useTimelineReveal";

const hero = ref<{ el: HTMLElement | null } | null>(null);

// Composable mutates the hero <aside> element's inline styles each rAF tick.
// We pass a getter ref so the composable can access the live DOM element
// after mount even though Hero.vue owns the inner ref.
const heroEl = computed(() => hero.value?.el ?? null);
// Convert to a Ref-like to satisfy the composable signature
const heroElRef = { get value() { return hero.value?.el ?? null; } } as any;
useHeroMorph(heroElRef, { startY: 0, endY: undefined });

// useTimelineReveal();

const goHome = () => {
  if (import.meta.client) window.scrollTo({ top: 0, behavior: "smooth" });
};

// TEMP (2026-08-05): intro + groups placeholders commented out with the timeline
// block. Restore / replace with real content when the timeline is brought back.
// const intro =
//   "Lorem ipsum placeholder — replace with a 2-3 sentence introduction about who you are, what you build, and what you care about.";
//
// const groups = [
//   {
//     year: "Placeholder Year A",
//     entries: [
//       {
//         title: "First project title here",
//         summary:
//           "Short summary of what this milestone was, the outcome, and what you learned.\n2-3 lines reads best.",
//         project: "first-project",
//       },
//       {
//         title: "Something you did in school / work",
//         summary: "Another entry. Leave the `project` field out if it's not a link.",
//       },
//     ],
//   },
//   {
//     year: "Placeholder Year B",
//     entries: [
//       {
//         title: "A bigger project with its own page",
//         summary:
//           "Because this entry has `project: 'second-project'`, clicking the title opens /projects/second-project — triggering the state-2 sidebar morph.",
//         project: "second-project",
//       },
//       {
//         title: "A non-linked milestone",
//         summary: "Showing the difference between linked and non-linked entries.",
//       },
//     ],
//   },
//   {
//     year: "Placeholder Year C",
//     entries: [
//       {
//         title: "Year three entry",
//         summary: "More content so the timeline has vertical room to scroll through.",
//       },
//       {
//         title: "Another one",
//         summary: "Each entry uses the same Faraz-style fade-in reveal effect.",
//       },
//     ],
//   },
//   {
//     year: "Placeholder Year D",
//     entries: [
//       {
//         title: "Final milestone",
//         summary: "The page should now scroll comfortably far.",
//       },
//     ],
//   },
// ];
</script>

<style scoped>
.page-root {
  position: relative;
  /* keep the page-root at least 100dvh tall so the hero's in-flow slot
     (when position: relative at scrollY=0) doesn't cause layout shift;
     useHeroMorph makes the hero position: fixed once t > 0, so the page
     retains its scroll height. */
  min-height: 100dvh;
}

/* TEMP (2026-08-05): keeps the page scrollable while the timeline is commented
   out, so the hero dock morph can still be exercised. Delete with the temp block. */
.hero-scroll-spacer {
  height: 200dvh;
}

.timeline-column {
  background: var(--color-bg);
  padding: 6rem 1.5rem 8rem;
  /* edge-fade mask always active (invisible above content area, harmless if
     content fills the column) — mirrors faraz's signature mask effect */
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0, transparent 26px, black 38px,
    black calc(100% - 38px), transparent calc(100% - 26px), transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0, transparent 26px, black 38px,
    black calc(100% - 38px), transparent calc(100% - 26px), transparent 100%
  );
}

@media (min-width: 768px) {
  .timeline-column {
    padding: 6rem 3rem 8rem calc(38% + 3rem);
  }
}

.intro {
  max-width: 50rem;
  font-size: 1.125rem;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.8);
  margin: 0 0 5rem;
}

.footer-spacer {
  height: 30vh;
}
</style>
