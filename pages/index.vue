<template>
  <div class="page-root">
    <Hero ref="hero" state="index" @back="goHome" />

    <section class="timeline-column">
      <div class="timeline-stack">
        <h2 class="intro-heading">Myself</h2>
        <p class="intro">{{ intro }}</p>
        <Timeline :groups="groups" />
        <div class="end-note">
          <p class="end-meta">last updated on Aug 2026</p>
          <p class="end-hook">still growing — new things land here on a regular pace</p>
        </div>
      </div>
      <div class="footer-spacer" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHeroMorph } from "~/composables/useHeroMorph";
import { useTimelineReveal } from "~/composables/useTimelineReveal";

const hero = ref<{ el: HTMLElement | null } | null>(null);

// Composable mutates the hero <aside> element's inline styles each rAF tick.
// We pass a getter ref so the composable can access the live DOM element
// after mount even though Hero.vue owns the inner ref. The timeline column
// stays below the fold via CSS margin (see .timeline-column), so the dock
// finishes before any content can appear.
const heroEl = computed(() => hero.value?.el ?? null);
// Convert to a Ref-like to satisfy the composable signature
const heroElRef = { get value() { return hero.value?.el ?? null; } } as any;
useHeroMorph(heroElRef, { startY: 0, endY: undefined });

useTimelineReveal();

const goHome = () => {
  if (import.meta.client) window.scrollTo({ top: 0, behavior: "smooth" });
};

type TimelineEntry = {
  title: string;
  summary: string;
  project?: string;
  children?: TimelineEntry[];
};
type TimelineGroup = { year: string; entries: TimelineEntry[] };

// Intro copy: lorem ipsum placeholder until the user supplies the final "Myself"
// text. Keep it short (2-3 sentences) so it reads like faraz's intro.
const intro =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

// Curated from content/mainpagecontent.md (lightly copy-edited). Entries with a
// `project` slug link to /projects/:slug — the case-study pages (polish later).
const groups: TimelineGroup[] = [
  {
    year: "Getting here",
    entries: [
      {
        title: "Drawing was the first love",
        summary: "Still have the sketches I made.",
      },
      {
        title: "Dabbled in trading",
        summary: "Learned the markets, lost some and gained some.",
      },
      {
        title: "Learned to code",
        summary: "Built things, didn't deploy them — until now.",
      },
    ],
  },
  {
    year: "2024",
    entries: [
      {
        title: "bezgoFresh — the startup we built",
        summary:
          "Started with a group of college mates: a cold-chain based last-mile delivery service that connects local vendors with customers online — easing shopping for customers while enabling multiple channels for vendors.",
        children: [
          {
            title: "Operations bot",
            summary:
              "The entire operation ran over WhatsApp, so we built one custom solution for menu generation, order management, data management, billing, invoice generation and payment links — pushing the operations team from 10 to 50+ orders a day.",
            project: "bezgofresh/operationsbotcontent",
          },
          {
            title: "Vendor Communication System",
            summary:
              "Instead of calling vendors for every order, we gave them a complete solution to receive orders, update menus and see their day-to-day sales and analytics — cutting the daily hassle, miscommunication and spreadsheet juggling.",
            project: "bezgofresh/vcscontent",
          },
        ],
      },
      {
        title: "100+ orders a day",
        summary:
          "Combining both solutions, bezgoFresh is now pushing 100+ orders per day.",
      },
    ],
  },
  {
    year: "Built to sell & repurpose",
    entries: [
      {
        title: "Footwear management suite",
        summary:
          "A complete offline desktop application for small and medium footwear shops — billing, inventory, label design & printing, daily checkouts and analytics.",
        project: "footwearcontent",
      },
      {
        title: "Travel Agency suite",
        summary:
          "A desktop application for travel agencies to track customers, create invoices, track commissions, manage payments and analyse the service delivered so far.",
        project: "travelsuitecontent",
      },
      {
        title: "AuthEngine",
        summary:
          "A self-hosted microservice that delivers login OTPs over WhatsApp — sub-second, zero-cost, with enterprise-grade auth.",
        project: "authenginecontent",
      },
    ],
  },
];
</script>

<style scoped>
.page-root {
  position: relative;
  /* The home hero is always position:fixed on desktop (see useHeroMorph), so it
     needs no in-flow slot; this min-height just guarantees a stable first viewport. */
  min-height: 100dvh;
}

.timeline-column {
  /* Fully transparent — no surface at all, so the fixed HexPattern clusters are
     never covered: the content reads as text moving directly over the pattern. */
  background: transparent;
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
    /* 38% docked hero + 2rem gap (the "2-point" gap next to the docked hero) */
    padding: 6rem 3rem 8rem calc(38% + 2rem);
    /* Hold the column below the fold until the dock transform (one viewport of
       scroll) has finished; only then does it scroll up from the bottom like
       normal page content. */
    margin-top: 200dvh;
  }
}

/* The timeline spine: runs from the "Myself" heading all the way down the
   timeline (used to start only at the first group header inside Timeline.vue). */
.timeline-stack {
  position: relative;
}
.timeline-stack::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: -5rem;
  width: 5px;
  background: rgba(0, 0, 0, 0.6);
}
@media (max-width: 767px) {
  .timeline-stack::before {
    display: none;
  }
}

.intro-heading {
  font-size: clamp(1.75rem, 4.5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  margin: 0 0 1.5rem;
}

.intro {
  max-width: 50rem;
  font-size: 1.125rem;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.8);
  margin: 0 0 5rem;
}

.footer-spacer {
  height: 12vh;
}

/* End-of-content note (part of the scrolling column, NOT a separate footer
   section): the last-updated date + a "still growing" hook. The docked hero
   hint reads "stop scrolling :)" by the time the user reaches this point. */
.end-note {
  margin-top: 8rem;
  text-align: center;
  font-family: var(--font-mono);
}
.end-note p {
  margin: 0;
}
.end-meta {
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  color: rgba(0, 0, 0, 0.75);
}
.end-hook {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  color: rgba(0, 0, 0, 0.55);
}
</style>
