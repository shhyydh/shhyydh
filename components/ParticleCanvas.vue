<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 pointer-events-none z-10"
    style="background: transparent"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useParticleCanvas } from "~/composables/useParticleCanvas";

const canvasRef = ref<HTMLCanvasElement | null>(null);
useParticleCanvas(canvasRef);
</script>
