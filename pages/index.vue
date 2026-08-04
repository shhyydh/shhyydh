<template>
  <div class="page-root">
    <Hero :state="state" @back="goHome" />

    <!-- in normal flow this comes right after the 100dvh hero,
         so page scroll continues into it naturally -->
    <section
      class="timeline-column"
      :data-docked="state === 'docked'"
    >
      <p
        data-timeline-item
        class="intro"
      >
        {{ intro }}
      </p>
      <Timeline :groups="groups" />
      <div class="footer-spacer" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useScrollDock } from "~/composables/useScrollDock";
import { useTimelineReveal } from "~/composables/useTimelineReveal";

const state = useScrollDock(0.7);

useTimelineReveal();

const goHome = () => {
  if (import.meta.client) window.scrollTo({ top: 0, behavior: "smooth" });
};

const intro =
  "Lorem ipsum placeholder — replace with a 2-3 sentence introduction about who you are, what you build, and what you care about.";

const groups = [
  {
    year: "Placeholder Year A",
    entries: [
      {
        title: "First project title here",
        summary:
          "Short summary of what this milestone was, the outcome, and what you learned.\n2-3 lines reads best.",
        project: "first-project",
      },
      {
        title: "Something you did in school / work",
        summary: "Another entry. Leave the `project` field out if it's not a link.",
      },
    ],
  },
  {
    year: "Placeholder Year B",
    entries: [
      {
        title: "A bigger project with its own page",
        summary:
          "Because this entry has `project: 'second-project'`, clicking the title opens /projects/second-project — triggering the state-2 sidebar morph.",
        project: "second-project",
      },
    ],
  },
];
</script>

<style scoped>
.page-root {
  position: relative;
  min-height: 100dvh;
}

.timeline-column {
  background: var(--color-bg);
  padding: 6rem 1.5rem 8rem;
  transition: padding-left 0.5s var(--ease-dock), padding-right 0.5s var(--ease-dock);
}

@media (min-width: 768px) {
  .timeline-column {
    padding: 6rem 4rem 8rem;
  }
  /* when hero is docked (state=docked), nudge the timeline content to the right
     so it sits beside the 38%-wide fixed hero, not under it */
  .timeline-column[data-docked="true"] {
    padding-left: calc(38% + 3rem);
    padding-right: 3rem;
  }
  /* edge-fade mask active when docked (mirrors faraz's effect) */
  .timeline-column[data-docked="true"] {
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent 0,
      transparent 26px,
      black 38px,
      black calc(100% - 38px),
      transparent calc(100% - 26px),
      transparent 100%
    );
    mask-image: linear-gradient(
      to bottom,
      transparent 0,
      transparent 26px,
      black 38px,
      black calc(100% - 38px),
      transparent calc(100% - 26px),
      transparent 100%
    );
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
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
