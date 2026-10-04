<template>
  <CaseStudy
    brand="AuthEngine" title="The OTP Engine"
    page-title="The OTP Engine — shhyydh"
    description="AuthEngine: a self-hosted WhatsApp OTP microservice — scan once, verify forever. Zero-cost, sub-second delivery with enterprise-grade auth and resilient sessions."
    :meta="meta" :next="next" :learned="learned"
  >
    <template #subtitle>
        SMS OTPs cost money and take time to get approval and docs verifications.
        WhatsApp reaches every user instantly. I gave the product team a secure,
        self-hosted microservice that delivers login OTPs over WhatsApp — with
        enterprise-grade auth, resilient sessions, and a 512MB-deployable footprint,
        this can't be a full-time solution but we can use this to pull up a small
        system under a company or an mvp testing product for 2-3 cities easily.

    </template>

    <section class="case-section case-overview" data-reveal>
      <p>
        Most teams still verify users through expensive SMS gateways with per-message
        fees and slow carrier routes. I've conceptualized a 'scan once, verify forever'
        model — a self-hosted WhatsApp delivery layer that turns a phone's Linked
        Devices into a zero-cost, sub-second OTP channel, fully wrapped in an
        authenticated REST API, which is really helpful in the specialized scenarios
        for development and small-scale productions.
      </p>
    </section>

    <section class="case-duo" data-reveal>
      <div class="case-block">
        <p class="case-kicker">The Challenge</p>
        <h2>The Bottleneck</h2>
        <p>
          The product needed phone-number verification for login, but the existing
          options were painful: SMS gateways burned budget per message, third-party
          OTP SaaS shipped shared pools of phone numbers with latency spikes, and
          WhatsApp's official Business API required a lengthy verification process.
          There was no secure, self-hosted path from a server to a user's WhatsApp
          inbox.
        </p>
      </div>
      <div class="case-block">
        <p class="case-kicker">The Solution</p>
        <h2>The Reality</h2>
        <p>
          I built a 'living' delivery engine. I engineered a production-ready
          microservice that boots a headless WhatsApp Web client, exposes a QR pairing
          flow, persists sessions to disk so it never re-authenticates, and exposes a
          JWT-protected /send-otp endpoint that generates cryptographically secure
          codes and delivers them in seconds.
        </p>
      </div>
      <blockquote class="case-quote">
        "I didn't just build a message sender; I engineered a self-healing delivery
        pipeline that translates a phone's QR scan into a permanent, low-cost
        authentication channel."
      </blockquote>
    </section>

    <section class="case-section" data-reveal>
      <p class="case-kicker">Under the Hood</p>
      <h2 class="case-hood-title">Technical Execution</h2>
      <p class="case-hood-intro">
        A breakdown of the core systems engineered to deliver reliability and security.
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

    <CaseCta line="Want to try it?" label="Just let me know! →" />

    <section class="case-section" data-reveal>
      <h2 class="case-value-title">The Outcome.</h2>
      <p class="case-value">
        AuthEngine went from a broken, manual SMS workflow to a live self-hosted
        service streaming OTPs over WhatsApp — paired, persisted, and shipped in 1
        week.
      </p>
      <ul class="case-chips">
        <li v-for="chip in chips" :key="chip">{{ chip }}</li>
      </ul>
    </section>
  </CaseStudy>
</template>

<script setup lang="ts">
const meta = [
  { label: "Role", value: "Technical Strategy & Backend Engineering" },
  { label: "Timeline", value: "1 Week" },
  { label: "Key Technologies", value: "Node.js / Express / TypeScript / whatsapp-web.js / Puppeteer / JWT / Joi / Helmet / Winston / Docker" },
];

const next = { to: "/projects/bezgofresh/operations-bot", title: "The Operations Engine" };

const learned = [
  "This project taught me that scope is a feature.",
  "A week of focused scope out-ships a month of imagined requirements.",
  "The right tool doesn't chase the newest channel — it meets the user where they already are.",
];

const features = [
  {
    title: "Performance First",
    points: [
      "Engineered aggressive Puppeteer flags (--js-flags=--max-old-space-size=200, --renderer-process-limit=1) to squeeze the WhatsApp client into 512MB cloud memory.",
      "Built a watchdog on the loading_screen event to detect and surface stuck Chrome sessions at 45 seconds.",
      "Achieved ~2-5 second OTP delivery with a 256MB V8 heap cap for the Node process.",
    ],
  },
  {
    title: "Resilient Sessions",
    points: [
      "Wired LocalAuth with a fixed clientId so a linked phone persists across restarts — zero QR re-scans on redeploys.",
      "Implemented a watchdog timeout (authTimeoutMs: 0) tuned for slow Railway/Render cold starts.",
      "Added automatic Puppeteer executable detection and cache-path fallback for containerized platforms.",
    ],
  },
  {
    title: "Security-First Scale",
    points: [
      "Leveraged TypeScript strict mode and Joi schemas to validate every request and env var at boot.",
      "Layered rate limiting, Helmet headers, CORS allow-lists, and full audit logging with masked phone numbers.",
      "Generated OTPs with crypto.randomInt and shipped graceful shutdown and request-ID correlation.",
    ],
  },
];

const chips = ["Sub-Second Delivery", "Zero Re-Scans", "Enterprise Security", "One-Command Deploy"];
</script>
