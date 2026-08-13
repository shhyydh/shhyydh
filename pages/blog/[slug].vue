<template>
  <div class="post-root">
    <Hero state="sidebar" @back="goHome" />

    <main class="post-main">
      <article class="post-article">
        <header class="post-header" data-reveal>
          <p class="post-kicker">
            <span v-if="post.series">{{ post.series }}</span>
            <span v-if="post.chapter" aria-hidden="true"> — </span>
            <span v-if="post.chapter">Chapter {{ String(post.chapter).padStart(2, "0") }}</span>
          </p>
          <h1 class="post-title">{{ post.title }}</h1>
          <p class="post-meta">
            <time :datetime="post.date">{{ formatDate(post.date) }}</time>
            <span aria-hidden="true"> · </span>
            <span>{{ readTime }} min read</span>
          </p>
        </header>

        <div class="blog-prose">
          <ContentRenderer :value="post as any" />
        </div>

        <nav class="post-next" data-reveal aria-label="Blog navigation">
          <NuxtLink to="/blog" class="post-back">← All writings</NuxtLink>
          <NuxtLink
            v-if="next"
            :to="next.path"
            class="post-fwd"
          >
            Next chapter — <span>{{ next.title }} →</span>
          </NuxtLink>
          <span v-else class="post-fwd post-fwd-end">The series continues soon.</span>
        </nav>
      </article>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useScrollReveal } from "~/composables/useScrollReveal";
import { useProseReveal } from "~/composables/useProseReveal";

useScrollReveal();
useProseReveal();

// Reloads restore the browser's previous scroll position (often mid-article);
// the page should start at the title. Client-side navigations and back/forward
// keep Nuxt's default scroll behavior.
onMounted(() => {
  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  if (nav?.type === "reload") window.scrollTo(0, 0);
});

const route = useRoute();
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const countWords = (node: any): number => {
  if (!node) return 0;
  if (node.type === "text") {
    return (node.value ?? "").trim().split(/\s+/).filter(Boolean).length;
  }
  return (node.children ?? []).reduce((sum: number, child: any) => sum + countWords(child), 0);
};

const { data: postData } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection("blog").where("path", "=", `/blog/${slug}`).first()
);

if (!postData.value) {
  throw createError({ statusCode: 404, statusMessage: "Post not found", fatal: true });
}

const post = computed(() => postData.value!);

const { data: allPosts } = await useAsyncData(`blog-${slug}-all`, () =>
  queryCollection("blog").order("chapter", "ASC").all()
);

const visiblePosts = computed(() => (allPosts.value ?? []).filter((p) => p.draft !== true));
const index = computed(() => visiblePosts.value.findIndex((p) => p.path === post.value.path));
const next = computed(() =>
  index.value >= 0 && index.value < visiblePosts.value.length - 1
    ? visiblePosts.value[index.value + 1]
    : null
);

const words = computed(() => countWords(post.value?.body ?? null));
const readTime = computed(() => Math.max(1, Math.round(words.value / 220)));

useHead({
  title: `${post.value.title} — shhyydh`,
  meta: [
    { name: "description", content: post.value.description },
    { property: "og:title", content: post.value.title },
    { property: "og:description", content: post.value.description },
  ],
});

const goHome = () => navigateTo("/");
</script>

<style scoped>
.post-root {
  position: relative;
  min-height: 100dvh;
}

.post-main {
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
  .post-main {
    margin-left: 60px;
    padding: 8rem 6rem 10rem;
    width: calc(100% - 60px);
  }
}

.post-article {
  max-width: 50rem;
  margin: 0 auto;
}

.post-kicker {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0 0 1.25rem;
}

.post-title {
  font-size: clamp(2.25rem, 5.5vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.04;
  margin: 0 0 1.5rem;
}

.post-meta {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  color: rgba(0, 0, 0, 0.55);
  margin: 0 0 4rem;
}

.post-next {
  margin-top: 7rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding-top: 2rem;
}

.post-next a {
  font-size: 1rem;
  text-decoration: none;
}

.post-back {
  color: rgba(0, 0, 0, 0.7);
  transition: color 0.3s ease;
}
.post-back:hover {
  color: var(--color-ink);
}

.post-fwd {
  color: var(--color-accent);
  transition: color 0.3s ease;
}
.post-fwd span {
  font-weight: 800;
}
.post-fwd:hover {
  color: var(--color-accent-hover);
}

.post-fwd-end {
  color: rgba(0, 0, 0, 0.5);
}

@media (min-width: 768px) {
  .post-next {
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
:deep(.prose-reveal) {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s var(--ease-dock), transform 0.7s var(--ease-dock);
}
:deep(.prose-reveal.is-in) {
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
