<template>
  <div class="page-root">
    <Hero ref="hero" state="index" @back="goHome" />

    <section class="timeline-column">
      <div class="timeline-stack">
        <h2 class="intro-heading">What drives me</h2>
        <p class="intro">{{ intro }}</p>
        <Timeline :groups="groups" />
        <section class="writings">
          <p class="writings-kicker">My writings</p>
          <p class="writings-line">I'm documenting the learnings in here.</p>
          <NuxtLink to="/blog" class="writings-link">Read my writings →</NuxtLink>
        </section>
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

usePageSeo({
  title: "shhyydh's Portfolio",
  description: "shhyydh's portfolio: journey, projects, and contact.",
});

const goHome = () => {
  if (import.meta.client) window.scrollTo({ top: 0, behavior: "smooth" });
};

type TimelineEntry = {
  title: string;
  summary: string;
  project?: string;
  badge?: string;
  metrics?: string[];
  cta?: string;
  ctaTo?: string;
  children?: TimelineEntry[];
};
type TimelineGroup = {
  year: string;
  entries: TimelineEntry[];
  sub?: { title: string; entries: TimelineEntry[] };
};

// The intro under "What drives me": what pulls me into building things.
const intro =
  "I don't enjoy learning technologies for the sake of learning them.\n\nI enjoy understanding how things work, why they break, and how they can be rebuilt into something simpler.\n\nEvery project I build starts with curiosity — not a framework. Whether it's automating operations, designing products, or exploring new tools, I'm always chasing the next thing that teaches me to think differently.";

// Curated from content/mainpagecontent.md (lightly copy-edited). Entries with a
// `project` slug link to /projects/:slug — the case-study pages.
const groups: TimelineGroup[] = [
  {
    year: "The rabbit holes I followed",
    entries: [
      {
        title: "I started with a pencil",
        summary: "Long before I wrote code, I filled notebooks with sketches.",
      },
      {
        title: "Curiosity found the markets",
        summary: "Enough wins to stay interested.\nEnough losses to stay humble.",
      },
      {
        title: "Then I discovered software",
        summary: "Suddenly every idea became buildable.",
      },
    ],
  },
  {
    year: "2024",
    entries: [
      {
        title: "Built my first real startup — bezgoFresh",
        summary:
          "Helping a traditional local business run like a modern software company. Built an operations platform that scaled a WhatsApp-first startup from manual workflows to 100+ daily orders.",
        metrics: ["100+ Orders", "4 Internal Tools", "WhatsApp Automation"],
        cta: "Read Case Study",
        ctaTo: "/startup/bezgofresh",
      },
    ],
  },
  {
    year: "Things I've Built",
    entries: [
      {
        title: "Operations bot",
        summary:
          "A WhatsApp bot that runs a delivery business — orders, menus, billing and data management.",
        project: "bezgofresh/operations-bot",
        badge: "bezgoFresh",
      },
      {
        title: "Vendor Communication System",
        summary:
          "A vendor platform that handles orders, menus and daily sales for their day to day sales.",
        project: "bezgofresh/vcs",
        badge: "bezgoFresh",
      },
      {
        title: "AuthEngine",
        summary: "A self-hosted service that delivers login OTPs over WhatsApp.",
        project: "auth-engine",
      },
    ],
    sub: {
      title: "Built things that paid for",
      entries: [
        {
          title: "Footwear management suite",
          summary:
            "A desktop application for footwear shops — billing, inventory, label printing and analytics.",
          project: "footwear-suite",
        },
        {
          title: "Travel Agency suite",
          summary:
            "A desktop application that runs a travel agency — customers, invoices, commissions and payments.",
          project: "agency-suite",
        },
      ],
    },
  },
];
</script>

<style scoped>
.page-root {
  position: relative;
  /* The home hero is always position:fixed on desktop (see useHeroMorph), so it
     needs no in-flow slot; this min-height just guarantees a stable first viewport. */
  min-height: 100dvh;
  /* Consistent dock grid: name sits at the gutter, then a gap, the spine, a
     gap, then the content. --dock-name-width is set by useHeroMorph from the
     measured hero-name width, so all three line up exactly. */
  --dock-gutter: 6rem;
  --dock-gap: 3rem;
}

.timeline-column {
  /* Fully transparent — no surface at all, so the fixed HexPattern clusters are
     never covered: the content reads as text moving directly over the pattern. */
  background: transparent;
  padding: 6rem 1.5rem 8rem;
  /* No edge-fade mask here: it only covered the column's own top/bottom
     padding, so it was invisible, yet it forced the whole (very tall) column
     into a masked layer that repainted on every scroll frame. */
}

@media (min-width: 768px) {
  .timeline-column {
    /* Content clears the docked hero name and spine with an equal --dock-gap on
       both sides: name | gap | spine | gap | content, with the content column's
       right padding matching the left gutter so page margins stay aligned. */
    padding: 6rem 6rem 8rem
      calc(var(--dock-gutter) + var(--dock-gap) + var(--dock-name-width, 20rem) + var(--dock-gap));
  }
}
@media (min-width: 768px) and (prefers-reduced-motion: no-preference) {
  .timeline-column {
    /* Hold the column below the fold until the dock transform (one viewport of
       scroll) has finished; only then does it scroll up from the bottom like
       normal page content. With reduced motion there's no dock, so no hold —
       otherwise that's two empty viewports between the hero and the content. */
    margin-top: 200dvh;
  }
}

/* The timeline spine: runs from the "What drives me" heading all the way down the
   timeline (used to start only at the first group header inside Timeline.vue). */
.timeline-stack {
  position: relative;
}
.timeline-stack::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(-1 * var(--dock-gap));
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
  white-space: pre-line;
}

.footer-spacer {
  height: 12vh;
}

.writings {
  margin-top: 8rem;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.writings-kicker {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0 0 1rem;
}

.writings-line {
  font-family: var(--font-sans);
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0 0 1.5rem;
}

.writings-link {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.95rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
  text-decoration: none;
  border-bottom: 1px solid var(--color-accent);
  padding-bottom: 0.25rem;
  transition: color 0.3s ease, border-color 0.3s ease;
}
.writings-link:hover {
  color: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
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
