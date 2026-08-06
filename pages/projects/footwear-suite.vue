<template>
  <div class="case-root">
    <Hero state="sidebar" @back="goHome" />

    <main class="case-main">
      <article class="case-article">
        <header class="case-header" data-reveal>
          <p class="case-brand">Build Log</p>
          <h1 class="case-title">Footwear Shop Management System</h1>
        </header>

        <dl class="case-meta" data-reveal>
          <div class="case-meta-item">
            <dt>Role</dt>
            <dd>Full-Stack Desktop Development &amp; System Architecture</dd>
          </div>
          <div class="case-meta-item">
            <dt>Timeline</dt>
            <dd>8 Weeks</dd>
          </div>
          <div class="case-meta-item">
            <dt>Key Technologies</dt>
            <dd>
              Electron / React 19 / TypeScript / Vite / SQLite (better-sqlite3) / Node.js /
              TSPL / ESC/POS / Koffi (FFI) / SerialPort / Electron-builder
            </dd>
          </div>
        </dl>

        <section class="case-section case-overview" data-reveal>
          <p>
            Many footwear shops still rely on decade-old Windows machines and thermal printers that newer software no longer supports.
            Instead of asking businesses to replace their hardware, I built an offline-first desktop platform that works across generations—handling billing, inventory, barcode labels and receipts from a single codebase.
          </p>
        </section>

        <section class="case-duo" data-reveal>
          <div class="case-block">
            <p class="case-kicker">The Challenge</p>
            <h2>The Bottleneck</h2>
            <p>
              Shops need more than a cash register. They need billing, inventory with size
              variants, returns and exchanges, supplier purchases, staff management, and
              sales analytics — all working offline. But the hardest constraint was
              hardware: label printers speak raw TSPL commands, receipt printers speak
              ESC/POS, and a large share of retail machines still run 32-bit Windows 7.
              One codebase had to serve all of it.
            </p>
          </div>
          <div class="case-block">
            <p class="case-kicker">The Solution</p>
            <h2>The Reality</h2>
            <p>
              I've built a full desktop POS system on Electron with a React UI, backed by a
              local SQLite database. I've engineered a dual-build architecture — a modern
              x64 build and a legacy ia32 build — that share a single source tree, and a
              hardware printing engine that translates structured print jobs into TSPL or
              ESC/POS byte streams through one unified IPC channel.
            </p>
          </div>
          <blockquote class="case-quote">
            "I haven't just build a billing app, built a hardware bridge that turns one
            offline source of truth into labels, receipts, and reports on printers of every
            era."
          </blockquote>
        </section>

        <section class="case-section" data-reveal>
          <p class="case-kicker">Under the Hood</p>
          <h2 class="case-hood-title">Technical Execution</h2>
          <p class="case-hood-intro">
            A breakdown of the core systems engineered to deliver performance and
            reliability.
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
          <p class="case-cta-line">Wanna test out?</p>
          <a class="case-cta-btn" :href="`mailto:${contactEmail}`">reach out to me.. →</a>
        </section>

        <section class="case-section" data-reveal>
          <h2 class="case-value-title">The Outcome.</h2>
          <p class="case-value">
            The shop went from paper ledgers to a live desktop platform handling billing,
            barcode labels, returns, supplier purchases, and daily analytics — with one
            installer that runs on both Windows 11 and Windows 7 machines.
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
  title: "Footwear Shop Management System — shhyydh",
  meta: [
    {
      name: "description",
      content:
        "An offline-capable desktop POS platform for footwear shops — billing, size-variant inventory, TSPL label and ESC/POS receipt printing, from a 2010 shop PC to a 2025 laptop.",
    },
  ],
});

const goHome = () => navigateTo("/");

const contactEmail = "reachoutshahid@proton.me";

const next = { to: "/projects/agency-suite", title: "Agency Suite" };

const learned = [
  "This project taught me that good engineering isn't about using the newest technology.",
  "It's about respecting the constraints people already live with.",
  "The best solution isn't always the most modern one—it's the one people can adopt tomorrow.",
];

const features = [
  {
    title: "Dual-Build Architecture",
    points: [
      "Shared source tree between latest/ (Electron 37, ESM) and legacy/ (Electron 22, CommonJS) via symlinks.",
      "TypeScript NodeNext resolution compiles the same files to ESM or CJS based on each package's module type.",
      "A postinstall script recreates the tree on Windows with directory junctions and patches node-gyp for VS 2026 toolchains.",
    ],
  },
  {
    title: "Hardware Printing Engine",
    points: [
      "TSPL2 command builder for barcode shoe labels, driven through raw Win32 spooler calls via koffi FFI.",
      "ESC/POS renderer that converts invoice models into receipt byte streams for 80mm printers.",
      "One IPC print channel keeps the React UI printer-agnostic — a structured job in, the correct driver out.",
    ],
  },
  {
    title: "Data Integrity & Type-Safe Scale",
    points: [
      "Strict TypeScript across the entire codebase, shared models between main process and UI.",
      "SQLite schema modelling products separately from size/color variants — the correct model for shoe stock.",
      "Dedicated migration scripts for data-restructure releases, plus manual and login-triggered backup & restore.",
    ],
  },
];

const chips = [
  "Offline-Capable POS",
  "Two Printer Families Supported",
  "Win7 → Win11 Coverage",
  "Bulk Import & Analytics",
];
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
