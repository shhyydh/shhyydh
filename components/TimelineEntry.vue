<template>
  <div data-timeline-item class="group transition-all duration-300 ease-out will-change-transform">
    <div>
      <div
        class="font-bold mb-2 font-sans"
        :class="
          dense
            ? 'text-base md:text-lg'
            : entry.children?.length
              ? 'text-2xl md:text-3xl'
              : 'text-lg md:text-2xl'
        "
      >
        <NuxtLink
          v-if="entry.project"
          :to="`/projects/${entry.project}`"
          class="text-accent underline decoration-accent/20 decoration-1 hover:text-accent-hover hover:decoration-accent-hover transition-all duration-500 ease-in-out"
        >
          {{ entry.title }}
        </NuxtLink>
        <span v-else>{{ entry.title }}</span>
        <span v-if="entry.badge" class="font-normal text-black/70 text-sm md:text-base"> ({{ entry.badge }})</span>
      </div>
      <p
        class="leading-relaxed whitespace-pre-line text-black/80"
        :class="dense ? 'text-sm md:text-base' : 'text-base md:text-lg'"
      >
        {{ entry.summary }}
      </p>
      <div
        v-if="entry.metrics?.length"
        class="mt-5 space-y-3"
      >
        <span
          v-for="m in entry.metrics"
          :key="m"
          class="flex items-baseline gap-1.5"
        >
          <span class="text-xl md:text-2xl font-extrabold text-accent">
            {{ m.split(" ")[0] }}
          </span>
          <span class="text-sm md:text-base text-black/60">
            {{ m.split(" ").slice(1).join(" ") }}
          </span>
        </span>
      </div>
      <NuxtLink
        v-if="entry.ctaTo"
        :to="entry.ctaTo"
        class="mt-4 inline-block font-mono text-sm md:text-base text-black/60 hover:text-accent-hover transition-colors duration-300"
      >
        <span class="text-accent">→</span>
        <span
          class="underline decoration-accent/30 underline-offset-4 hover:decoration-accent-hover transition-colors duration-300"
          >&nbsp;{{ entry.cta }}</span
        >
      </NuxtLink>
      <p v-else-if="entry.cta" class="mt-4 font-mono text-sm md:text-base text-black/60">
        <span class="text-accent">→</span>
        {{ entry.cta }}
      </p>
      <div
        v-if="entry.children?.length"
        class="mt-5 space-y-5 pl-4 md:pl-6 border-l-2 border-black/10"
      >
        <TimelineEntry
          v-for="child in entry.children"
          :key="child.title"
          :entry="child"
          dense
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type TimelineEntry = {
  title: string;
  summary: string;
  project?: string;
  badge?: string;
  metrics?: string[];
  cta?: string;
  ctaTo?: string;
  children?: TimelineEntry[];
};

defineProps<{
  entry: TimelineEntry;
  dense?: boolean;
}>();
</script>
