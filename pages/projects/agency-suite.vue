<template>
  <div class="case-root">
    <Hero state="sidebar" @back="goHome" />

    <main class="case-main">
      <article class="case-article">
        <header class="case-header" data-reveal>
          <p class="case-brand">Agency Suite</p>
          <h1 class="case-title">The Offline Business Operating System</h1>
          <p class="case-subtitle">
            A small travel agency that lives on paper. Invoices typed by hand, receipts in
            a drawer, earnings hidden inside a diary. No way to know what's been paid, who
            owes what, or whether the month was actually profitable. I gave them a
            self-contained desktop app — no cloud, no subscription, no developer required —
            that runs invoicing, payments, commissions and analytics entirely on their
            machine.
          </p>
        </header>

        <dl class="case-meta" data-reveal>
          <div class="case-meta-item">
            <dt>Role</dt>
            <dd>Product Design &amp; Full Stack Desktop Development</dd>
          </div>
          <div class="case-meta-item">
            <dt>Timeline</dt>
            <dd>~2 Months, Iterative</dd>
          </div>
          <div class="case-meta-item">
            <dt>Key Technologies</dt>
            <dd>
              Electron / React / TypeScript / Vite / better-sqlite3 / React Query /
              Recharts / SheetJS / Playwright
            </dd>
          </div>
        </dl>

        <section class="case-section case-overview" data-reveal>
          <p>
            Agencies are stuck with two impossible choices: SaaS tools that bleed money
            monthly and hold your data hostage in the cloud, or generic invoice templates
            that can't carry your brand, your services, or your currencies. I've built a
            third path — a native desktop application that installs like a normal program,
            lets the agency paint its own identity on every screen and invoice, and stores
            everything in a local, encrypted database it fully owns.
          </p>
        </section>

        <section class="case-duo" data-reveal>
          <div class="case-block">
            <p class="case-kicker">The Challenge</p>
            <h2>The Bottleneck</h2>
            <p>
              The client ran a real travel agency on paper — handwritten invoices, a paper
              ledger, and no way to track which customers had paid, how much was still
              owed, or which services actually made money. Every month-end was a scramble
              of receipts and guesswork. Any "solution" had to be something a non-technical
              owner could install and configure in minutes: their own logo, their own
              services, their own currencies, their own invoice style — with zero cloud,
              zero subscriptions, and zero ongoing developer involvement.
            </p>
          </div>
          <div class="case-block">
            <p class="case-kicker">The Solution</p>
            <h2>The Reality</h2>
            <p>
              I've engineered a complete offline operations suite. A signed, branded
              invoice generator with print and PDF export; payment tracking with
              partial-payment history and running balances; a commission and incentive
              ledger; and a seven-tab analytics dashboard that turns the raw invoice data
              into profit, service and customer intelligence. Every piece of customer PII
              is encrypted at rest, every IPC call is validated and frame-checked, and the
              whole thing ships as installers for Windows, macOS and Linux.
            </p>
          </div>
          <blockquote class="case-quote">
            "I didn't just build an invoice app, engineered a business brain that turns a
            travel agency's daily paper into real-time financial intelligence — entirely on
            their own machine."
          </blockquote>
        </section>

        <section class="case-section" data-reveal>
          <p class="case-kicker">Under the Hood</p>
          <h2 class="case-hood-title">Technical Execution</h2>
          <p class="case-hood-intro">
            A breakdown of the core systems engineered to deliver a secure, self-contained
            desktop product.
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
          <p class="case-cta-line">Wanna try it</p>
          <a class="case-cta-btn" :href="`mailto:${contactEmail}`">reach out to me →</a>
        </section>

        <section class="case-section" data-reveal>
          <h2 class="case-value-title">The Value.</h2>
          <p class="case-value">
            Agency Suite went from a paper-based back office to a live, self-contained
            operations system — installed, branded and used by the agency with no cloud, no
            monthly fees and no developer dependency.
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
  title: "The Offline Business Operating System — shhyd",
  meta: [
    {
      name: "description",
      content:
        "Agency Suite: a self-contained offline desktop app for travel agencies — invoicing, payments, commissions and analytics on their own machine, with zero cloud and zero subscriptions.",
    },
  ],
});

const goHome = () => navigateTo("/");

const contactEmail = "reachoutshahid@proton.me";

const next = { to: "/projects/auth-engine", title: "AuthEngine" };

const learned = [
  "This project taught me that the best software disappears into the user's day.",
  "No cloud, no subscriptions, no support calls — the product's job was to be forgettable in the best way.",
  "Trust is earned by giving people ownership of their own data, not by promising them more features.",
];

const features = [
  {
    title: "Bulletproof Desktop Architecture",
    points: [
      "Isolated three-process Electron model: sandboxed renderer, context-isolated preload bridge, and a main process that owns every database and system call.",
      "A single type-safe IPC contract (EventPayloadMapping) drives every channel with compile-time guarantees.",
      "Every IPC event is validated against the trusted UI frame and rejected with a \"Malicious event\" guard.",
    ],
  },
  {
    title: "Encryption at Rest",
    points: [
      "AES-256-GCM with random IVs, auth tags and AAD for all customer and invoice PII.",
      "scrypt-derived keys and graceful fallbacks keep data readable without ever shipping plaintext.",
      "Field-level encrypt/decrypt helpers applied at the exact write and read boundaries.",
    ],
  },
  {
    title: "Local-First Data Engine",
    points: [
      "Synchronous SQLite (better-sqlite3) powering customers, invoices, line items, payments, incentives, settings and a global invoice-number sequence.",
      "Additive auto-migrations that evolve the schema and even rewrite legacy invoice-number formats across app updates.",
      "A multi-currency engine that converts every sale into the agency's chosen base currency for analytics.",
    ],
  },
  {
    title: "PDFs, Print & Branding",
    points: [
      "Invoice documents generated to HTML with embedded base64 logos and seals, then rendered via print-to-PDF pipelines.",
      "Robust multi-tier logo fallback (PNG → SVG → generated text logo) so a document always renders.",
      "Company name, contact block, thank-you note, signature image and address — all configurable from Settings, with assets stored safely in the user-data directory so they survive app updates.",
    ],
  },
  {
    title: "Analytics That Pay Rent",
    points: [
      "Seven-tab reporting built on real SQL aggregation: revenue, services, customers, financials, incentives and time-based performance.",
      "Profit analysis from purchase-vs-selling prices, discount analysis, currency performance and payment-collection rates.",
      "Commission tracking with categories, filters and dedicated analytics.",
    ],
  },
  {
    title: "Backup, Data Portability & Testing",
    points: [
      "Full import/export to Excel (single combined file or separate invoices/customers), with date-range export and dedupe-aware imports.",
      "Automated E2E suites in Playwright covering launch, navigation, invoices, customers, reports and settings.",
      "Custom NSIS installer logic that pre-creates the database directory and preserves user data across uninstalls.",
    ],
  },
];

const chips = ["Encrypted At Rest", "Fully Offline & Installable", "Seven-Tab Real-Time Analytics"];
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
