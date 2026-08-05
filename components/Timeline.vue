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
          <div
            v-for="entry in group.entries"
            :key="entry.title"
            data-timeline-item
            class="group transition-all duration-300 ease-out will-change-transform"
          >
            <div>
              <div
                class="font-bold mb-2 font-sans"
                :class="entry.children?.length ? 'text-2xl md:text-3xl' : 'text-lg md:text-2xl'"
              >
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
              <div
                v-if="entry.children?.length"
                class="mt-5 space-y-5 pl-4 md:pl-6 border-l-2 border-black/10"
              >
                <div
                  v-for="child in entry.children"
                  :key="child.title"
                  data-timeline-item
                  class="transition-all duration-300 ease-out will-change-transform"
                >
                  <div class="text-base md:text-lg font-bold font-sans">
                    <NuxtLink
                      v-if="child.project"
                      :to="`/projects/${child.project}`"
                      class="text-accent underline decoration-accent/20 decoration-1 hover:text-accent-hover hover:decoration-accent-hover transition-all duration-500 ease-in-out"
                    >
                      {{ child.title }}
                    </NuxtLink>
                    <span v-else>{{ child.title }}</span>
                  </div>
                  <p
                    class="text-sm md:text-base leading-relaxed whitespace-pre-line text-black/70"
                  >
                    {{ child.summary }}
                  </p>
                </div>
              </div>
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

type TimelineEntry = {
  title: string;
  summary: string;
  project?: string;
  children?: TimelineEntry[];
};
type TimelineGroup = { year: string; entries: TimelineEntry[] };
</script>
