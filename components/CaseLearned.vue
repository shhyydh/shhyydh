<template>
  <section class="case-learned" data-reveal>
    <p class="case-learned-kicker">What I learned</p>
    <blockquote class="case-learned-quote">
      <p v-for="line in lines" :key="line">{{ line }}</p>
    </blockquote>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  lines: string[];
}>();
</script>

<style scoped>
.case-learned {
  margin-top: 8rem;
}

.case-learned-kicker {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0 0 1.5rem;
}

.case-learned-quote {
  border-left: 4px solid var(--color-accent);
  padding-left: 1.5rem;
  margin: 0;
  max-width: 46rem;
}

.case-learned-quote p {
  font-size: 1.05rem;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0;
  color: rgba(0, 0, 0, 0.8);
  margin: 0;
}

.case-learned-quote p + p {
  margin-top: 0.75rem;
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
