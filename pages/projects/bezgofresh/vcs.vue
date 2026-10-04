<template>
  <CaseStudy
    brand="bezgoFresh" title="The Vendor Control System"
    page-title="The Vendor Control System — shhyydh"
    description="bezgoFresh&#x27;s vendor control system: a role-based SaaS platform giving a Google-Sheets-run vendor network one real-time source of truth for orders, menus, and regional names."
    :meta="meta" :next="next" :learned="learned"
  >
    <template #subtitle>
        bezgoFresh's vendors ran on phone calls and scattered Google Sheets — prices,
        availability and regional names in different tabs, nothing real-time. We gave
        them one coordinated platform for orders, menus and daily sales, without the
        back-and-forth.

    </template>

    <section class="case-section case-overview" data-reveal>
      <p>
        Behind every customer order sits a chain of hand-offs, and each one created
        confusion — vendors waiting for phone calls, menus out of sync, orders
        confirmed twice. We built a role-based platform where every zone shares one
        source of truth, and preparation status stays synchronized with operations.
      </p>
    </section>

    <section class="case-duo" data-reveal>
      <div class="case-block">
        <p class="case-kicker">The Challenge</p>
        <h2>The Bottleneck</h2>
        <p>
          The business coordinated dozens of vendors across multiple zones using
          scattered Google Sheets — orders, prices, availability and regional names
          lived in different tabs. Nothing was real-time. Vendors waited for phone
          calls to know what to prepare, and multi-vendor orders had no coordinated
          response flow. The process failed to scale with the region's daily demand.
        </p>
      </div>
      <div class="case-block">
        <p class="case-kicker">The Solution</p>
        <h2>The Reality</h2>
        <p>
          Instead of calling vendors for every order, we gave them the platform
          itself. Menus can be updated digitally, orders arrive automatically, and
          preparation status stays synchronized with operations. Orders dispatch
          externally only once every vendor has answered — without losing the regional
          character of the local menus.
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

    <CaseCta line="Want to built something like this?" label="reach out to me... →" />

    <section class="case-section" data-reveal>
      <h2 class="case-value-title">The Outcome.</h2>
      <p class="case-value">
        bezgoFresh went from Google Sheets to a live platform showing real-time vendor
        orders, coordinated multi-vendor responses, and unified regional menus — built
        and shipped in 12 weeks.
      </p>
      <ul class="case-chips">
        <li v-for="chip in chips" :key="chip">{{ chip }}</li>
      </ul>
    </section>
  </CaseStudy>
</template>

<script setup lang="ts">
const meta = [
  { label: "Role", value: "Technical Strategy & Full Stack Development" },
  { label: "Timeline", value: "12 Weeks" },
  { label: "Key Technologies", value: "Next.js 15 / TypeScript / Prisma / PostgreSQL / Redis / WebSockets / SSE / Azure" },
];

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
