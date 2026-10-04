<template>
  <div class="case-root">
    <Hero state="sidebar" @back="goHome" />

    <main class="case-main">
      <article class="case-article">
        <header class="case-header" data-reveal>
          <p class="case-brand">{{ brand }}</p>
          <h1 class="case-title">{{ title }}</h1>
          <p v-if="$slots.subtitle" class="case-subtitle"><slot name="subtitle" /></p>
        </header>

        <dl class="case-meta" data-reveal>
          <div v-for="item in meta" :key="item.label" class="case-meta-item">
            <dt>{{ item.label }}</dt>
            <dd>{{ item.value }}</dd>
          </div>
        </dl>

        <slot />

        <CaseLearned v-if="learned" :lines="learned" />

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

// The shared shell for every case-study page: sidebar hero, header, the
// Role/Timeline/Stack strip, "what I learned" and the next-case link. Pages
// supply the body as the default slot. Styles live in assets/css/case.css.
const props = defineProps<{
  brand: string;
  title: string;
  /** <title> and meta description for the page */
  pageTitle: string;
  description: string;
  meta: { label: string; value: string }[];
  next: { to: string; title: string };
  learned?: string[];
}>();

useScrollReveal();
usePageSeo({ title: props.pageTitle, description: props.description, type: "article" });

const goHome = () => navigateTo("/");
</script>
