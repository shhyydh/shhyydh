<template>
  <section class="case-cta" data-reveal>
    <p class="case-cta-line">{{ line }}</p>
    <slot />
    <a class="case-cta-btn" :href="email">{{ label }}</a>
  </section>
</template>

<script setup lang="ts">
defineProps<{ line: string; label: string }>();

const email = useSocials().find((s) => s.label === "Email")!.href;
</script>
