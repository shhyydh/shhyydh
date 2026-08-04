<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <ParticleCanvas />
  </ClientOnly>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: { lang: "en" },
});
</script>
