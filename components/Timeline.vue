<template>
  <div class="relative" data-timeline-scroll>
    <div
      class="hidden md:block absolute -left-20 top-0 bottom-0 w-[5px] bg-black/60"
      aria-hidden="true"
    />
    <div class="space-y-26 pt-20 mb:pt-0 text-center md:text-left">
      <div v-for="group in groups" :key="group.year">
        <h2
          data-timeline-item
          class="text-3xl md:text-6xl font-extrabold mb-15 tracking-tight transition-all duration-300 ease-out will-change-transform"
        >
          {{ group.year }}
        </h2>
        <div class="space-y-16">
          <div
            v-for="entry in group.entries"
            :key="entry.title"
            data-timeline-item
            class="group transition-all duration-300 ease-out will-change-transform"
          >
            <div>
              <div class="text-lg md:text-2xl font-bold mb-4">
                <NuxtLink
                  v-if="entry.project"
                  :to="`/projects/${entry.project}`"
                  class="text-accent underline decoration-accent/20 decoration-1 hover:text-accent-hover hover:decoration-accent-hover transition-all duration-500 ease-in-out"
                >
                  {{ entry.title }}
                </NuxtLink>
                <span v-else>{{ entry.title }}</span>
              </div>
              <p
                class="text-base md:text-lg leading-relaxed whitespace-pre-line text-black/80"
              >
                {{ entry.summary }}
              </p>
            </div>
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
            summary: "Edit pages/index.vue to replace this placeholder timeline.\nUse the same structure as faraz's site: year headers + entries.",
          },
        ],
      },
    ],
  }
);

type TimelineEntry = { title: string; summary: string; project?: string };
type TimelineGroup = { year: string; entries: TimelineEntry[] };
</script>
