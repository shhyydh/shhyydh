<template>
  <CaseStudy
    brand="Agency Suite" title="The Offline Business Operating System"
    page-title="The Offline Business Operating System — shhyydh"
    description="Agency Suite: a self-contained offline desktop app for travel agencies — invoicing, payments, commissions and analytics on their own machine, with zero cloud and zero subscriptions."
    :meta="meta" :next="next" :learned="learned"
  >
    <template #subtitle>
        A small travel agency that lives on paper. Invoices typed by hand, receipts in
        a drawer, earnings hidden inside a diary. No way to know what's been paid, who
        owes what, or whether the month was actually profitable. I gave them a
        self-contained desktop app — no cloud, no subscription, no developer required —
        that runs invoicing, payments, commissions and analytics entirely on their
        machine.

    </template>

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

    <CaseCta line="Wanna try it" label="reach out to me →" />

    <section class="case-section" data-reveal>
      <h2 class="case-value-title">The Outcome.</h2>
      <p class="case-value">
        Agency Suite went from a paper-based back office to a live, self-contained
        operations system — installed, branded and used by the agency with no cloud, no
        monthly fees and no developer dependency.
      </p>
      <ul class="case-chips">
        <li v-for="chip in chips" :key="chip">{{ chip }}</li>
      </ul>
    </section>
  </CaseStudy>
</template>

<script setup lang="ts">
const meta = [
  { label: "Role", value: "Product Design & Full Stack Desktop Development" },
  { label: "Timeline", value: "~2 Months, Iterative" },
  { label: "Key Technologies", value: "Electron / React / TypeScript / Vite / better-sqlite3 / React Query / Recharts / SheetJS / Playwright" },
];

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
