<template>
  <div class="case-root">
    <Hero state="sidebar" @back="goHome" />

    <main class="case-main">
      <article class="case-article">
        <header class="case-header" data-reveal>
          <p class="case-brand">Build Log</p>
          <h1 class="case-title">
            How a local delivery startup slowly became an operations platform.
          </h1>
          <p class="case-subtitle">
            Sometimes the biggest problem isn't getting more customers. It's making sure
            every order reaches the right people without creating more work behind the
            scenes.
          </p>
        </header>

        <dl class="case-meta" data-reveal>
          <div class="case-meta-item">
            <dt>Role</dt>
            <dd>Founding Engineer / Full-Stack Engineer / Product Designer</dd>
          </div>
          <div class="case-meta-item">
            <dt>Duration</dt>
            <dd>2024 – Present</dd>
          </div>
          <div class="case-meta-item">
            <dt>Stack</dt>
            <dd>
              Node.js / React / TypeScript / PostgreSQL / WhatsApp / Google Sheets /
              Railway
            </dd>
          </div>
        </dl>

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

        <section class="case-cta" data-reveal>
          <p class="case-cta-line">Interested in how the platform was built?</p>
          <p class="case-cta-sub">Let's talk.</p>
          <p class="case-cta-arrow" aria-hidden="true">↓</p>
          <a class="case-cta-btn" :href="`mailto:${contactEmail}`">Reach Out</a>
        </section>

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
  title: "How bezgoFresh became an operations platform — shhyd",
  meta: [
    {
      name: "description",
      content:
        "How a local delivery startup slowly became an operations platform — the story of building bezgoFresh's WhatsApp-first order system from manual workflows to 100+ daily orders.",
    },
  ],
});

const goHome = () => navigateTo("/");

const contactEmail = "reachoutshahid@proton.me";

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
  margin: 0 0 1rem;
}

.case-cta-sub {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.65);
  margin: 0 0 2rem;
}

.case-cta-arrow {
  font-size: 1.4rem;
  line-height: 1;
  color: var(--color-accent);
  margin: 0 0 2rem;
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
