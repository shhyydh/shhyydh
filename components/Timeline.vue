<template>
  <div class="relative" data-timeline-scroll>
    <div class="space-y-26 pt-20 md:pt-0 text-center md:text-left">
      <div v-for="group in groups" :key="group.year">
        <h2
          data-timeline-item
          class="text-3xl md:text-6xl font-extrabold mb-8 tracking-tight transition-all duration-300 ease-out will-change-transform"
        >
          {{ group.year }}
        </h2>
        <div class="space-y-10">
          <TimelineEntry
            v-for="entry in group.entries"
            :key="entry.title"
            :entry="entry"
          />
        </div>
        <div v-if="group.sub" class="mt-12">
          <h3
            data-timeline-item
            class="text-lg md:text-2xl font-bold mb-6 tracking-tight pt-8 border-t border-black/10 text-black/80 transition-all duration-300 ease-out will-change-transform"
          >
            {{ group.sub.title }}
          </h3>
          <div class="space-y-10">
            <TimelineEntry
              v-for="entry in group.sub.entries"
              :key="entry.title"
              :entry="entry"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    groups?: TimelineGroup[];
  }>(),
  {
    groups: () => [
      {
        year: "(placeholder)",
        entries: [
          {
            title: "Add your first milestone here",
            summary:
              "Edit pages/index.vue to replace this placeholder timeline.\nUse the same structure as faraz's site: year headers + entries.",
          },
        ],
      },
    ],
  }
);

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
type TimelineGroup = {
  year: string;
  entries: TimelineEntry[];
  sub?: { title: string; entries: TimelineEntry[] };
};
</script>
