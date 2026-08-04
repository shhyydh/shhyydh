<template>
  <div class="project-root">
    <Hero state="sidebar" @back="goHome" />

    <main class="project-main">
      <article v-if="doc" class="prose-block">
        <h1 class="proj-title">{{ doc.title }}</h1>
        <p class="proj-subtitle">{{ doc.subtitle }}</p>
        <ContentRenderer :value="doc" />
      </article>
      <div v-else class="prose-block">
        <p class="text-black/60">Project not found.</p>
        <NuxtLink to="/" class="text-accent underline">← back home</NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = computed(() => String(route.params.slug));

const { data: doc } = await useAsyncData(
  () => `project-${slug.value}`,
  () => queryContent(`/projects/${slug.value}`).findOne(),
  { watch: [slug] }
);

const goHome = () => navigateTo("/");
</script>

<style scoped>
.project-root { position: relative; min-height: 100dvh; }

.project-main {
  width: 100%;
  padding: 6rem 1.5rem 8rem;
  background: var(--color-bg);
  box-sizing: border-box;
  min-height: 100dvh;
}

@media (min-width: 768px) {
  .project-main {
    margin-left: 88px;
    padding: 6rem 5rem 8rem;
    width: calc(100% - 88px);
  }
}

.prose-block {
  max-width: 48rem;
  margin: 0 auto;
}

.proj-title {
  font-size: clamp(1.875rem, 5vw, 3.75rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin: 0 0 1rem;
}
.proj-subtitle {
  color: rgba(0, 0, 0, 0.6);
  margin: 0 0 2rem;
  font-size: 1rem;
}

/* style content rendered from markdown */
:deep(h1) { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 700; margin: 2.5rem 0 1rem; letter-spacing: -0.02em; }
:deep(h2) { font-size: clamp(1.25rem, 2.4vw, 1.5rem); font-weight: 700; margin: 2rem 0 1rem; }
:deep(p)  { line-height: 1.7; margin: 0 0 1rem; color: rgba(0, 0, 0, 0.85); }
:deep(ul), :deep(ol) { margin: 0 0 1.5rem; padding-left: 1.5rem; }
:deep(li) { margin: 0.25rem 0; line-height: 1.6; }
:deep(img) { width: 100%; height: auto; border-radius: 0.5rem; margin: 1.5rem 0; }
:deep(a)  { color: var(--color-accent); text-decoration: underline; text-underline-offset: 3px; }
:deep(a:hover) { color: var(--color-accent-hover); }
:deep(code) { background: rgba(0,0,0,0.05); padding: 0.15em 0.4em; border-radius: 0.25rem; font-family: ui-monospace, monospace; font-size: 0.9em; }
</style>
