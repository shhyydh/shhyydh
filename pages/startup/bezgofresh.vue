<template>
  <CaseStudy
    brand="Build Log" title="How a local delivery startup slowly became an operations platform."
    page-title="How bezgoFresh became an operations platform — shhyydh"
    description="How a local delivery startup slowly became an operations platform — the story of building bezgoFresh&#x27;s WhatsApp-first order system from manual workflows to 100+ daily orders."
    :meta="meta" :next="next"
  >
    <template #subtitle>
        Sometimes the biggest problem isn't getting more customers. It's making sure
        every order reaches the right people without creating more work behind the
        scenes.

    </template>

          <section class="post-lead" data-reveal>
            <p>
              bezgoFresh didn't begin as a software project.
            </p>
            <p>
              It began as a small delivery startup trying to connect local vendors with
              customers online.
            </p>
            <div class="post-stack">
              <p v-for="line in section1.lines" :key="line">{{ line }}</p>
            </div>
            <p>
              The business worked.
            </p>
            <p>
              But only because people spent hours every day holding it together.
            </p>
            <p class="post-close">
              That became the real problem.
            </p>
          </section>

          <section class="post-section" data-reveal>
            <h2 class="post-h2">Living inside the operation</h2>
            <p class="post-p">
              Before building anything, I wanted to understand how every piece of
              information moved through the business.
            </p>
            <p class="post-p">
              From the customer's order to the vendor's preparation… from the delivery
              rider to the final payment…
            </p>
            <p class="post-p">
              Every order passed through multiple people.
            </p>
            <p class="post-p">
              Each hand-off created opportunities for mistakes.
            </p>
            <div class="post-stack">
              <p v-for="line in section2.lines" :key="line">{{ line }}</p>
            </div>
            <p class="post-p">
              None of these problems existed because people weren't capable.
            </p>
            <p class="post-p">
              They existed because the system depended on people remembering everything.
            </p>
            <p class="post-p">
              Instead of asking people to work harder, I wanted the system to carry more of
              the work.
            </p>
          </section>

          <section class="post-section" data-reveal>
            <h2 class="post-h2">Designing the system</h2>
            <div class="post-stack">
              <p v-for="line in section3.intro" :key="line">{{ line }}</p>
            </div>

            <div class="post-subb">
              <h3>Operations Bot</h3>
              <p class="post-p">
                Instead of manually copying every order into spreadsheets,
                the bot reads incoming WhatsApp messages, extracts structured
                order data and automatically updates the day's operations.
                Invoices and payment links are generated automatically after orders are
                confirmed.
                What previously took minutes now happens almost instantly.
              </p>
              <p class="post-p">
                Instead of repeating the same administrative work every day, the team
                focuses on serving customers.
              </p>
              <NuxtLink to="/projects/bezgofresh/operations-bot" class="post-more"
                >Know more &rarr;</NuxtLink
              >
            </div>

            <div class="post-subb">
              <h3>Vendor Communication System</h3>
              <div class="post-stack">
                <p v-for="line in section3.vcs" :key="line">{{ line }}</p>
              </div>
              <p class="post-p">
                Behind every customer order sits an internal dashboard that keeps
                operations, vendors and deliveries connected through one shared source of
                truth.
              </p>
              <NuxtLink to="/projects/bezgofresh/vcs" class="post-more"
                >Know more &rarr;</NuxtLink
              >
            </div>
          </section>

          <section class="post-section" data-reveal>
            <h2 class="post-h2">
              Scaling was never the real goal — removing the friction was.
            </h2>
            <p class="post-p">
              Interestingly, we never built these tools because we wanted to "scale".
            </p>
            <p class="post-p">
              We built them because every new order created more manual work.
            </p>
            <p class="post-p">
              By reducing repetitive work instead of adding more people, the business
              naturally became capable of handling more orders without increasing
              operational complexity.
            </p>
            <p class="post-close">
              Growth became a side effect of better systems.
            </p>
          </section>

          <section class="post-section" data-reveal>
            <h2 class="post-h2">The hardest problems weren't technical</h2>
            <p class="post-p">
              Writing code was never the difficult part.
            </p>
            <p class="post-p">
              The difficult part was translating messy real-world behaviour into software.
            </p>
            <div class="post-stack">
              <p v-for="line in section5.lines" :key="line">{{ line }}</p>
            </div>
            <p class="post-p">
              Every exception became another design problem.
            </p>
            <p class="post-close">
              Building software taught me that reality is always more complicated than
              diagrams.
            </p>
          </section>

          <section class="post-section" data-reveal>
            <h2 class="post-h2">Decisions that we made</h2>
            <p class="post-p">
              Rather than building one large application, the platform evolved into a
              collection of smaller systems that communicate with one another.
            </p>
            <p class="post-p">
              Each service has one responsibility.
            </p>
            <div class="post-stack">
              <p v-for="line in section6.lines" :key="line">{{ line }}</p>
            </div>
            <p class="post-p">
              Keeping responsibilities separated made the platform easier to extend as the
              business continued to evolve.
            </p>
          </section>

          <section class="post-section" data-reveal>
            <h2 class="post-h2">The results we got</h2>
            <ul class="post-results">
              <li v-for="result in results" :key="result">{{ result }}</li>
            </ul>
          </section>

          <section class="post-section" data-reveal>
            <h2 class="post-h2">If I rebuilt it today…</h2>
            <p class="post-p">
              This project changed how I think about software.
            </p>
            <p class="post-p">
              If I started again today, I'd move away from Google Sheets much earlier,
              introduce an event-driven architecture from the beginning, and design every
              service around asynchronous communication.
            </p>
            <p class="post-p">
              The current platform solved the business problems it faced.
            </p>
            <p class="post-close">
              But every version teaches you how to build the next one better.
            </p>
          </section>

          <section class="post-section" data-reveal>
            <h2 class="post-h2">What did I learn from this</h2>
            <p class="post-p">
              Before bezgoFresh, I believed software solved problems.
              Today I think software does something different.
              It removes friction between people.
              The best products aren't the ones with the most features.
              They're the ones people stop noticing because everything simply works.
            </p>
            <blockquote class="post-takeaway">
              That's the kind of software I want to keep building.
            </blockquote>
          </section>

          <CaseCta line="Interested in how the platform was built?" label="Reach Out">
    <p class="case-cta-sub">Let's talk.</p>
    <p class="case-cta-arrow" aria-hidden="true">↓</p>
          </CaseCta>
  </CaseStudy>
</template>

<script setup lang="ts">
const meta = [
  { label: "Role", value: "Founding Engineer / Full-Stack Engineer / Product Designer" },
  { label: "Duration", value: "2024 – Present" },
  { label: "Stack", value: "Node.js / React / TypeScript / PostgreSQL / WhatsApp / Google Sheets / Railway" },
];

const next = { to: "/projects/footwear-suite", title: "Footwear Shop Management System" };

const section1 = {
  lines: [
    "Orders arrived through WhatsApp.",
    "Menus changed every morning.",
    "Vendors updated prices manually.",
    "Operations teams copied orders into spreadsheets.",
    "Invoices were created by hand.",
    "Delivery assignments happened over phone calls.",
  ],
};

const section2 = {
  lines: [
    "Wrong quantities.",
    "Missed items.",
    "Duplicate orders.",
    "Late deliveries.",
  ],
};

const section3 = {
  intro: [
    "The goal wasn't to replace WhatsApp.",
    "Our customers already loved using it.",
    "Instead, we built software around the way people already worked.",
    "Every tool solved one small piece of friction.",
    "Together they became an operating system for the business.",
  ],
  vcs: [
    "Vendors no longer wait for phone calls.",
    "Menus can be updated digitally.",
    "Orders arrive automatically.",
    "Preparation status stays synchronized with operations.",
    "Less confusion.",
    "Less back-and-forth.",
  ],
};

const section5 = {
  lines: [
    "Customers rarely order in exactly the same format.",
    "Different vendors call the same product by different names.",
    "Menu availability changes daily.",
    "People edit messages after sending them.",
  ],
};

const section6 = {
  lines: [
    "Order parsing.",
    "Vendor communication.",
    "Menu generation.",
    "Payments.",
    "Delivery management.",
    "Analytics.",
  ],
};

const results = [
  "100+ Orders handled daily",
  "Multiple internal tools connected together",
  "Significant reduction in manual order processing",
  "Automated menu generation",
  "Automated invoice creation",
  "Centralized vendor communication",
  "Shared operational dashboard",
];
</script>

<style scoped>
.post-lead {
  font-size: clamp(1.15rem, 2.4vw, 1.45rem);
  font-weight: 500;
  line-height: 1.65;
  letter-spacing: -0.01em;
  color: rgba(0, 0, 0, 0.85);
  max-width: 52rem;
  margin-top: 6rem;
}

.post-lead > p {
  margin: 0 0 1.25rem;
}

.post-lead > p:last-child {
  margin-bottom: 0;
}

.post-section {
  margin-top: 8rem;
}

.post-h2 {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.1;
  margin: 0 0 2.5rem;
  max-width: 40rem;
}

.post-p {
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.8);
  margin: 0 0 1.5rem;
  max-width: 46rem;
}

.post-p:last-child {
  margin-bottom: 0;
}

.post-stack {
  margin: 2.5rem 0;
  padding-left: 1.5rem;
}

.post-stack p {
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.62);
  margin: 0 0 0.5rem;
}

.post-stack p:last-child {
  margin-bottom: 0;
}

.post-close {
  font-family: var(--font-sans);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  margin: 2.5rem 0 0;
  max-width: 46rem;
}

.post-subb {
  margin-top: 4.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  max-width: 46rem;
}

.post-subb:first-of-type {
  margin-top: 4.5rem;
}

.post-subb h3 {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 1.25rem;
}

.post-subb .post-p {
  margin-bottom: 1rem;
}

.post-more {
  display: inline-block;
  margin-top: 1.75rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  text-decoration: none;
  border-bottom: 1px solid rgba(30, 64, 175, 0.4);
  padding-bottom: 0.2rem;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.post-more:hover {
  color: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
}

.post-results {
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 46rem;
}

.post-results li {
  position: relative;
  padding-left: 2rem;
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.85);
  margin: 0 0 0.9rem;
}

.post-results li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: 700;
}

.post-takeaway {
  border-left: 4px solid var(--color-accent);
  padding-left: 1.5rem;
  margin: 2.5rem 0 0;
  max-width: 46rem;
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.9);
}
</style>
