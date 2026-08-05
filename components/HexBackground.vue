<template>
  <svg
    aria-hidden="true"
    class="hex-bg"
    viewBox="0 0 1440 900"
    preserveAspectRatio="xMidYMid slice"
  >
    <polygon
      v-for="(pts, i) in filledClusters"
      :key="`f${i}`"
      :points="pts"
      class="hex-fill"
    />
    <polygon
      v-for="(pts, i) in outlineClusters"
      :key="`o${i}`"
      :points="pts"
      class="hex-outline"
    />
  </svg>
</template>

<script setup lang="ts">
// Decorative fixed background: a few scattered honeycomb clusters (not a full
// repeating pattern) drawn in the accent navy at very low opacity. The layer is
// `position: fixed` (z-index -1) so it never moves while content scrolls over it
// — the parallax "floating" feel. Pure static SVG: SSR-safe, no JS, no rAF.

type Cluster = { x: number; y: number; r: number };

const r3 = (r: number) => Math.sqrt(3) * r;

// Pointy-top regular hexagon (vertex at 90°), circumradius r.
const hexPoints = (cx: number, cy: number, r: number): string => {
  const pts: string[] = [];
  for (let k = 0; k < 6; k++) {
    const ang = (Math.PI / 180) * (90 + 60 * k);
    pts.push(
      `${(cx + r * Math.cos(ang)).toFixed(1)},${(cy + r * Math.sin(ang)).toFixed(1)}`
    );
  }
  return pts.join(" ");
};

// A "group of 7" honeycomb cluster: centre + 6 edge-adjacent neighbours.
const cluster = ({ x, y, r }: Cluster): string[] => {
  const h = r3(r);
  const offsets = [
    [0, 0],
    [h, 0],
    [-h, 0],
    [h / 2, 1.5 * r],
    [h / 2, -1.5 * r],
    [-h / 2, 1.5 * r],
    [-h / 2, -1.5 * r],
  ];
  return offsets.map(([dx, dy]) => hexPoints(x + dx, y + dy, r));
};

const filled: Cluster[] = [
  { x: 1180, y: 210, r: 32 },
  { x: 240, y: 770, r: 36 },
  { x: 760, y: 140, r: 16 },
  { x: 90, y: 300, r: 18 },
];
const outlined: Cluster[] = [{ x: 1290, y: 600, r: 20 }];

const filledClusters = filled.flatMap(cluster);
const outlineClusters = outlined.flatMap(cluster);
</script>

<style scoped>
.hex-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hex-fill {
  fill: var(--color-accent);
  fill-opacity: 0.07;
}
.hex-outline {
  fill: none;
  stroke: var(--color-accent);
  stroke-opacity: 0.16;
  stroke-width: 1.5;
}
</style>
