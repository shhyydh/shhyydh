<template>
  <div class="case-root">
    <Hero state="sidebar" @back="goHome" />

    <main class="case-main">
      <article class="case-article">
        <header class="case-header" data-reveal>
          <p class="case-brand">bezgoFresh</p>
          <h1 class="case-title">The Vendor Control System</h1>
          <p class="case-subtitle">
            A meat &amp; fish vendor network ran entirely on Google Sheets. No real-time
            pipeline. We gave it one unified platform — orders, menus, and regional names
            living together in a single, coordinated system.
          </p>
        </header>

        <dl class="case-meta" data-reveal>
          <div class="case-meta-item">
            <dt>Role</dt>
            <dd>Technical Strategy &amp; Full Stack Development</dd>
          </div>
          <div class="case-meta-item">
            <dt>Timeline</dt>
            <dd>12 Weeks</dd>
          </div>
          <div class="case-meta-item">
            <dt>Key Technologies</dt>
            <dd>Next.js 15 / TypeScript / Prisma / PostgreSQL / Redis / WebSockets / SSE / Azure</dd>
          </div>
        </dl>

        <section class="case-section case-overview" data-reveal>
          <p>
            Vendor networks need more than spreadsheets. We conceived a role-based SaaS
            architecture — SUPER_USER, Hub Managers, and Vendors — to build a fully digital
            order platform where every zone shares one source of truth while delivering
            real-time order flow.
          </p>
        </section>

        <section class="case-duo" data-reveal>
          <div class="case-block">
            <p class="case-kicker">The Challenge</p>
            <h2>The Bottleneck</h2>
            <p>
              The business coordinated dozens of vendors across multiple zones using
              scattered Google Sheets — orders, prices, availability, and regional names
              lived in different tabs. Nothing was real-time. Multi-vendor orders had no
              coordinated response flow, and the existing process failed to scale with the
              region's daily demand.
            </p>
          </div>
          <div class="case-block">
            <p class="case-kicker">The Solution</p>
            <h2>The Reality</h2>
            <p>
              We built a 'living' order platform. We engineered a real-time orchestration
              layer, greeting vendors with live order streams and coordinated status
              responses that dispatch externally only once every vendor has answered —
              without losing the regional character of the local menus.
            </p>
          </div>
          <blockquote class="case-quote">
            "We didn't just digitize a spreadsheet; we engineered a real-time order system
            that turns scattered vendor workflows into one coordinated platform."
          </blockquote>
        </section>

        <section class="case-section" data-reveal>
          <p class="case-kicker">Under the Hood</p>
          <h2 class="case-hood-title">Technical Execution</h2>
          <p class="case-hood-intro">
            A breakdown of the core systems engineered to deliver reliability and scale.
          </p>

          <div class="case-cards">
            <article v-for="(feature, i) in features" :key="feature.title" class="case-card"
              data-reveal :style="{ '--reveal-delay': `${i * 70}ms` }">
              <span class="case-card-num">{{ String(i + 1).padStart(2, "0") }}</span>
              <h3>{{ feature.title }}</h3>
              <ul>
                <li v-for="point in feature.points" :key="point">{{ point }}</li>
              </ul>
            </article>
          </div>
        </section>

        <section class="case-cta" data-reveal>
          <p class="case-cta-line">wanna to built something like this?</p>
          <a class="case-cta-btn" :href="`mailto:${contactEmail}`">reach out to me... →</a>
        </section>

        <section class="case-section" data-reveal>
          <h2 class="case-value-title">The Value.</h2>
          <p class="case-value">
            bezgoFresh went from Google Sheets to a live platform showing real-time vendor
            orders, coordinated multi-vendor responses, and unified regional menus — built
            and shipped in 12 weeks.
          </p>
          <ul class="case-chips">
            <li v-for="chip in chips" :key="chip">{{ chip }}</li>
          </ul>
        </section>

        <CaseLearned :lines="learned" />

        <nav class="case-next" data-reveal aria-label="Case study navigation">
          <NuxtLink to="/" class="case-next-back">← Back to timeline</NuxtLink>
          <NuxtLink :to="next.to" class="case-next-fwd">
            Next case study — <span>{{ next.title }} →</span>
          </NuxtLink>
        </nav>
      </article>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useScrollReveal } from "~/composables/useScrollReveal";

useScrollReveal();

useHead({
  title: "The Vendor Control System — shhyd",
  meta: [
    {
      name: "description",
      content:
        "bezgoFresh's vendor control system: a role-based SaaS platform giving a Google-Sheets-run vendor network one real-time source of truth for orders, menus, and regional names.",
    },
  ],
});

const goHome = () => navigateTo("/");

const contactEmail = "reachoutshahid@proton.me";

const next = { to: "/projects/footwear-suite", title: "Footwear Shop Management System" };

const learned = [
  "This project taught me that coordination is the hardest engineering problem.",
  "Real-time isn't speed — it's waiting for every vendor before the world hears about the order.",
  "A shared source of truth only holds when every zone has a reason to trust it.",
];

const features = [
  {
    title: "Real-Time Order Orchestration",
    points: [
      "Engineered multi-vendor order ingestion where a single order is resolved and split across vendors automatically.",
      "Built a WebSocket ingestion layer for external order entry with Server-Sent Events pushing NEW_ORDER live to each vendor dashboard.",
      "Implemented coordinated response tracking — orders dispatch externally only when all vendors respond, with per-item accept/reject and preparing-weight capture.",
      "Hardened ingestion with pg_advisory_xact_lock and Redis dispatch to prevent duplicate processing across concurrent workers.",
    ],
  },
  {
    title: "Four-Layer Menu Architecture",
    points: [
      "Modeled a layered catalog: MasterItem → RegionalName → VendorItem → VendorMenu as a single source of truth.",
      "Built zone-based regional names in Malayalam with primary/alternative roles and a vendor-submission → hub-approval workflow.",
      "Added size-driven pricing for fish (SMALL / MEDIUM / BIG) with unit overrides and a menu history system for snapshot, reset, and restore.",
    ],
  },
  {
    title: "Type-Safe Scale & Security",
    points: [
      "Leveraged strict TypeScript across the entire codebase with Zod validation on every ingestion path.",
      "Enforced role-based access control (SUPER_USER / HUB_MANAGER / VENDOR) with forced password change, session limits, and login rate limiting.",
      "Isolated data by zone, offloaded item images to Azure Blob Storage, and added performance indexes across all hot queries.",
    ],
  },
];

const chips = ["Real-Time Order Sync", "Coordinated Multi-Vendor Flow", "Unified Regional Menus"];
</script>

<style scoped>
.case-root {
  position: relative;
  min-height: 100dvh;
}

.case-main {
  width: 100%;
  box-sizing: border-box;
  padding: 6rem 1.5rem 8rem;
  background: transparent;
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
  .case-main {
    margin-left: 60px;
    padding: 8rem 6rem 10rem;
    width: calc(100% - 60px);
  }
}

.case-article {
  max-width: 68rem;
  margin: 0 auto;
}

.case-brand {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0 0 1.25rem;
}

.case-title {
  font-size: clamp(2.5rem, 6vw, 4.75rem);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.02;
  margin: 0 0 1.5rem;
}

.case-subtitle {
  max-width: 42rem;
  font-size: clamp(1.05rem, 2vw, 1.2rem);
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.7);
  margin: 0;
}

.case-meta {
  display: grid;
  gap: 1.5rem;
  margin: 6rem 0 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.case-meta-item dt {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.5);
  margin: 0 0 0.5rem;
}

.case-meta-item dd {
  font-size: 1rem;
  line-height: 1.55;
  color: rgba(0, 0, 0, 0.85);
  margin: 0;
}

@media (min-width: 768px) {
  .case-meta {
    grid-template-columns: 1fr 1fr 2fr;
    gap: 2rem;
  }
  .case-meta-item + .case-meta-item {
    padding-left: 2rem;
    border-left: 1px solid rgba(0, 0, 0, 0.12);
  }
}

.case-section {
  margin-top: 8rem;
}

.case-overview {
  font-size: clamp(1.15rem, 2.4vw, 1.45rem);
  font-weight: 500;
  line-height: 1.65;
  letter-spacing: -0.01em;
  color: rgba(0, 0, 0, 0.85);
  max-width: 52rem;
  margin-top: 6rem;
}
.case-overview p {
  margin: 0;
}

.case-kicker {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0 0 1rem;
}

.case-duo {
  margin-top: 8rem;
  display: grid;
  gap: 5rem;
}

.case-block h2 {
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0 0 1rem;
}

.case-block p {
  font-size: 1rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.8);
  margin: 0;
}

.case-quote {
  font-size: clamp(1.3rem, 2.8vw, 1.75rem);
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.015em;
  color: rgba(0, 0, 0, 0.9);
  border-left: 4px solid var(--color-accent);
  padding-left: 1.5rem;
  margin: 2rem 0 0;
  max-width: 52rem;
}

@media (min-width: 768px) {
  .case-duo {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem 4rem;
  }
  .case-quote {
    grid-column: 1 / -1;
    margin-top: 2rem;
  }
}

.case-hood-title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.05;
  margin: 0 0 1rem;
}

.case-hood-intro {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.65);
  margin: 0 0 5rem;
  max-width: 40rem;
}

.case-cards {
  display: grid;
  gap: 4rem 5rem;
}

@media (min-width: 768px) {
  .case-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

.case-card {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding-top: 2rem;
}

.case-card-num {
  display: block;
  font-family: var(--font-mono);
  font-size: 1.05rem;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.case-card h3 {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 0.75rem;
}

.case-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.case-card li {
  position: relative;
  padding-left: 1.25rem;
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.8);
  margin: 0 0 0.6rem;
}
.case-card li::before {
  content: "—";
  position: absolute;
  left: 0;
  color: var(--color-accent);
}

.case-cta {
  margin-top: 10rem;
  padding: 5rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  text-align: center;
}

.case-cta-line {
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0 0 1.75rem;
}

.case-cta-btn {
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
.case-cta-btn:hover {
  color: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
}

.case-value-title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.05;
  margin: 0 0 1.25rem;
}

.case-value {
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.8);
  margin: 0 0 2rem;
  max-width: 46rem;
}

.case-chips {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0;
  margin: 0;
}

.case-chips li {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  color: rgba(0, 0, 0, 0.75);
  border: 1px solid rgba(0, 0, 0, 0.22);
  border-radius: 999px;
  padding: 0.55rem 1.1rem;
}

.case-next {
  margin-top: 9rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding-top: 2rem;
}

.case-next a {
  font-size: 1rem;
  text-decoration: none;
}

.case-next-back {
  color: rgba(0, 0, 0, 0.7);
  transition: color 0.3s ease;
}
.case-next-back:hover {
  color: var(--color-ink);
}

.case-next-fwd {
  color: var(--color-accent);
  transition: color 0.3s ease;
}
.case-next-fwd span {
  font-weight: 800;
}
.case-next-fwd:hover {
  color: var(--color-accent-hover);
}

@media (min-width: 768px) {
  .case-next {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s var(--ease-dock), transform 0.7s var(--ease-dock);
  transition-delay: var(--reveal-delay, 0s);
}
[data-reveal].is-in {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
