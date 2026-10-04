<template>
  <div class="blog-root">
    <Hero state="sidebar" @back="goHome" />

    <main class="blog-main">
      <article class="blog-article">
        <header class="blog-header" data-reveal>
          <p class="blog-kicker">Writing</p>
          <h1 class="blog-title">My writings</h1>
          <p class="blog-subtitle">
            I'm documenting the learnings in here — what we tried, what we got wrong,
            and how we kept building.
          </p>
        </header>

        <ul v-if="posts.length" class="blog-list">
          <li v-for="post in posts" :key="post.path" class="blog-item" data-reveal>
            <NuxtLink :to="post.path" class="blog-link">
              <p class="blog-item-meta">
                <span v-if="post.series">{{ post.series }} — Chapter {{ String(post.chapter).padStart(2, "0") }}</span>
                <span aria-hidden="true">·</span>
                <time :datetime="post.date">{{ formatDate(post.date) }}</time>
              </p>
              <h2 class="blog-item-title">{{ post.title }}</h2>
              <p v-if="post.description" class="blog-item-desc">{{ post.description }}</p>
              <span class="blog-item-read">Read →</span>
            </NuxtLink>
          </li>
        </ul>
        <p v-else class="blog-empty" data-reveal>Nothing here yet — the first chapter is on its way.</p>

        <nav class="blog-back" data-reveal aria-label="Back to home">
          <NuxtLink to="/" class="blog-back-link">← Back to timeline</NuxtLink>
        </nav>
      </article>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useScrollReveal } from "~/composables/useScrollReveal";

useScrollReveal();

usePageSeo({
  title: "My writings — shhyydh",
  description: "Long-form writing from shhyydh: the Building BezgoFresh series and the learnings behind it.",
});

const goHome = () => navigateTo("/");

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric" });

const { data } = await useAsyncData("blog-index", () =>
  queryCollection("blog").order("chapter", "ASC").all()
);
const posts = computed(() => (data.value ?? []).filter((post) => post.draft !== true));
</script>

<style scoped>
.blog-root {
  position: relative;
  min-height: 100dvh;
}

.blog-main {
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
  .blog-main {
    margin-left: 60px;
    padding: 8rem 6rem 10rem;
    width: calc(100% - 60px);
  }
}

.blog-article {
  max-width: 52rem;
  margin: 0 auto;
}

.blog-kicker {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0 0 1.25rem;
}

.blog-title {
  font-size: clamp(2.5rem, 6vw, 4.75rem);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.02;
  margin: 0 0 1.5rem;
}

.blog-subtitle {
  max-width: 42rem;
  font-size: clamp(1.05rem, 2vw, 1.2rem);
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.7);
  margin: 0;
}

.blog-list {
  list-style: none;
  margin: 6rem 0 0;
  padding: 0;
}

.blog-item {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding: 2.5rem 0;
}

.blog-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.blog-item-meta {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.5);
  margin: 0 0 1rem;
  display: flex;
  gap: 0.6rem;
  align-items: baseline;
}

.blog-item-title {
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0 0 0.75rem;
  transition: color 0.3s ease;
}

.blog-link:hover .blog-item-title {
  color: var(--color-accent-hover);
}

.blog-item-desc {
  max-width: 40rem;
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.75);
  margin: 0 0 1.25rem;
}

.blog-item-read {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
  border-bottom: 1px solid var(--color-accent);
  padding-bottom: 0.2rem;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.blog-link:hover .blog-item-read {
  color: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
}

.blog-empty {
  margin-top: 6rem;
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.7);
}

.blog-back {
  margin-top: 9rem;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding-top: 2rem;
}

.blog-back-link {
  font-size: 1rem;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.7);
  transition: color 0.3s ease;
}
.blog-back-link:hover {
  color: var(--color-ink);
}

</style>
