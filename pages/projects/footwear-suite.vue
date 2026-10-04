<template>
  <CaseStudy
    brand="Build Log" title="Footwear Shop Management System"
    page-title="Footwear Shop Management System — shhyydh"
    description="An offline-capable desktop POS platform for footwear shops — billing, size-variant inventory, TSPL label and ESC/POS receipt printing, from a 2010 shop PC to a 2025 laptop."
    :meta="meta" :next="next" :learned="learned"
  >
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

    <CaseCta line="Wanna test out?" label="reach out to me.. →" />

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
  </CaseStudy>
</template>

<script setup lang="ts">
const meta = [
  { label: "Role", value: "Full-Stack Desktop Development & System Architecture" },
  { label: "Timeline", value: "8 Weeks" },
  { label: "Key Technologies", value: "Electron / React 19 / TypeScript / Vite / SQLite (better-sqlite3) / Node.js / TSPL / ESC/POS / Koffi (FFI) / SerialPort / Electron-builder" },
];

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
