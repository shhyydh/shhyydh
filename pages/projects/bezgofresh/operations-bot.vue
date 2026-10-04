<template>
  <CaseStudy
    brand="bezgoFresh" title="The Operations Engine"
    page-title="The Operations Engine — shhyydh"
    description="bezgoFresh&#x27;s WhatsApp operations bot: a conversation-to-operation engine that turns a single message into a complete order-to-delivery pipeline."
    :meta="meta" :next="next" :learned="learned"
  >
    <template #subtitle>
        bezgoFresh ran its entire delivery operation over WhatsApp chat — orders,
        menus, billing and delivery assignments all lived in one stream. I built a
        single bot to carry that work, so the team could focus on serving customers
        instead of holding the operation together.

    </template>

    <section class="case-section case-overview" data-reveal>
      <p>
        The business worked — but only because people spent hours every day holding
        it together. Every order passed through multiple hands, and each hand-off
        created mistakes: wrong quantities, missed items, duplicate orders. I built a
        'conversation-to-operation' engine that turns one WhatsApp message into a
        complete order-to-delivery pipeline, so the system carries more of the work.
      </p>
    </section>

    <section class="case-duo" data-reveal>
      <div class="case-block">
        <p class="case-kicker">The Challenge</p>
        <h2>The Bottleneck</h2>
        <p>
          Orders arrived through WhatsApp. Menus changed every morning. Vendors
          updated prices manually. Operations teams copied orders into spreadsheets
          and created invoices by hand. Delivery assignments happened over phone
          calls. It worked — but only because people spent hours every day holding it
          together, and every new order created more manual work.
        </p>
      </div>
      <div class="case-block">
        <p class="case-kicker">The Solution</p>
        <h2>The Reality</h2>
        <p>
          Instead of asking people to work harder, I made the system carry more of
          the work. The bot parses orders from real-time WhatsApp messages, regenerates
          menu cards from live pricing, issues invoices and payment links
          automatically, and syncs every order to fleet and operations dashboards —
          turning WhatsApp chaos into a streamlined business system.
        </p>
      </div>
      <blockquote class="case-quote">
        "I didn't just build a chatbot, engineered an operations engine that turns
        scattered WhatsApp messages into a complete, auditable order-to-delivery
        pipeline."
      </blockquote>
    </section>

    <section class="case-section" data-reveal>
      <p class="case-kicker">Under the Hood</p>
      <h2 class="case-hood-title">Technical Execution</h2>
      <p class="case-hood-intro">
        A breakdown of the core systems engineered to deliver reliability and speed.
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

    <CaseCta line="Want to build something like this??" label="Reach out to me →" />

    <section class="case-section" data-reveal>
      <h2 class="case-value-title">The Outcome.</h2>
      <p class="case-value">
        Went from manual WhatsApp juggling to a fully automated order-to-delivery
        workflow — menus regenerated on demand, invoices issued in seconds, and every
        order logged to Google Sheets in real time.
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
  { label: "Timeline", value: "6 Weeks" },
  { label: "Key Technologies", value: "Node.js / whatsapp-web.js / Express / Google Sheets API / Zoho Books / Canvas / Google Maps API / Docker / Railway" },
];

const next = { to: "/projects/bezgofresh/vcs", title: "The Vendor Control System" };

const learned = [
  "This project taught me that chaos is the best product spec.",
  "Automation only earns trust one order at a time — the system works when the humans stop noticing it.",
  "Every messy WhatsApp thread was a requirement I hadn't written down yet.",
];

const features = [
  {
    title: "Intelligent Order Parsing",
    points: [
      "Built a hybrid location extractor that pulls GPS coordinates from Google Maps links with Haversine fallback.",
      "Implemented Fuse.js fuzzy matching to resolve shop and item names from free-text messages.",
      "Achieved accurate single-shop and multi-shop order parsing with live price lookups.",
    ],
  },
  {
    title: "Automated Billing & Menus",
    points: [
      "Engineered Canvas-generated menu cards with live pricing from Google Sheets.",
      "Integrated Zoho Books to generate invoices and payment links in seconds.",
      "Built multi-shop billing logic with delivery charges, discounts, and tax exemption handling.",
    ],
  },
  {
    title: "Resilient Operations",
    points: [
      "Managed WhatsApp sessions with QR-based pairing and automated session recovery.",
      "Containerized the bot with Docker and deployed to Railway with health checks and restart policies.",
      "Synced every order to fleet and butcher dashboards in real time.",
    ],
  },
];

const chips = ["24/7 Order Processing", "Automated Invoicing", "Unified Operations"];
</script>
