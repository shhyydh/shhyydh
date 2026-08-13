<template>
  <div
    class="hex-pattern"
    aria-hidden="true"
    :style="rootStyle"
  >
    <div
      v-for="(c, ci) in clusters"
      :key="ci"
      class="hex-cluster"
      :style="clusterStyle(c)"
    >
      <div
        v-for="(h, hi) in c.hexes"
        :key="hi"
        class="hexagon"
        :style="hexStyle(c, h)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Decorative, entirely image-free background texture: a few isolated honeycomb
// patches (NOT a tiled wallpaper). Every hexagon is a div drawn with a CSS
// clip-path "ring" (outer hexagon fill + a ::before punch in the page colour),
// so only a thin clean outline remains. Each patch is a chunk of the infinite
// honeycomb mesh: a centre hex plus `rings` concentric rings of edge-adjacent
// neighbours. A radial-gradient mask dissolves every patch into the page like a
// soft fog — no hard boundary anywhere. One fixed layer (z-index: -1) serves the
// whole site. Pure HTML + CSS: no SVG, canvas, images, or icon libraries.
//
// Configurable via props (clusters / line / hole / stroke) and per-cluster CSS
// variables (--hp-cell, --hp-rotation via transform, --hp-mask).

export interface HexClusterConfig {
  /** cluster centre, % of the viewport (left) */
  x: number
  /** cluster centre, % of the viewport (top) */
  y: number
  /** hexagon box size in px (circumradius = cell / 2) */
  cell: number
  /** honeycomb rings around the centre hex: 1 → 7 hexes, 2 → 19, 3 → 37 */
  rings: number
  /** rotation of the whole patch in degrees */
  rotation: number
  /** whole-patch opacity (0.14–0.18 is the intended band) */
  opacity: number
  /** % of outermost-ring hexes removed (0–40) to roughen the silhouette */
  dropout?: number
  /** optional per-cluster mask-image override */
  mask?: string
}

const props = withDefaults(
  defineProps<{
    clusters?: HexClusterConfig[]
    /** outline colour of every hexagon */
    line?: string
    /** colour that punches the hexagon interiors (must match the page background) */
    hole?: string
    /** outline thickness */
    stroke?: string
  }>(),
  {
    line: "rgba(120, 150, 255, 1)",
    hole: "var(--color-bg)",
    stroke: "1px",
    clusters: () => [
      { x: 14, y: 20, cell: 52, rings: 4, rotation: 12, opacity: 0.16, dropout: 12 },
      { x: 84, y: 60, cell: 46, rings: 4, rotation: -18, opacity: 0.15, dropout: 16 },
      { x: 24, y: 100, cell: 60, rings: 3, rotation: 8, opacity: 0.17, dropout: 10 },
      { x: 50, y: 45, cell: 44, rings: 3, rotation: -10, opacity: 0.14, dropout: 14 },
    ],
  }
);

interface PreparedHex {
  dx: number;
  dy: number;
}
interface PreparedCluster extends HexClusterConfig {
  hexes: PreparedHex[];
  width: number;
  height: number;
}

// Pointy-top hex tile → pixel (axial coordinates q/r, size = circumradius).
const hexToPixel = (q: number, r: number, size: number) => ({
  dx: Math.sqrt(3) * size * (q + r / 2),
  dy: 1.5 * size * r,
});

// All hexes at exact distance k from the centre (max(|q|,|r|,|q+r|) === k).
const ringHexes = (k: number): Array<[number, number]> => {
  const out: Array<[number, number]> = [];
  for (let q = -k; q <= k; q++) {
    for (let r = -k; r <= k; r++) {
      if (Math.max(Math.abs(q), Math.abs(r), Math.abs(q + r)) === k) out.push([q, r]);
    }
  }
  return out;
};

// Deterministic pseudo-random skip (seeded, so SSR HTML === client HTML).
const skip = (i: number, pct: number) => pct > 0 && ((i * 2654435761) >>> 0) % 100 < pct;

const clusters = computed<PreparedCluster[]>(() =>
  props.clusters.map((c) => {
    const size = c.cell / 2;
    const hexes: PreparedHex[] = [];
    let maxX = 0;
    let maxY = 0;
    let idx = 0;
    const push = (q: number, r: number, ring: number) => {
      const dropped = ring > 0 && ring === c.rings && skip(idx, c.dropout ?? 0);
      idx++;
      if (dropped) return;
      const { dx, dy } = hexToPixel(q, r, size);
      hexes.push({ dx, dy });
      maxX = Math.max(maxX, Math.abs(dx));
      maxY = Math.max(maxY, Math.abs(dy));
    };
    push(0, 0, 0);
    for (let k = 1; k <= c.rings; k++) {
      for (const [q, r] of ringHexes(k)) push(q, r, k);
    }
    const halfW = maxX + size;
    const halfH = maxY + size;
    return { ...c, hexes, width: halfW * 2, height: halfH * 2 };
  })
);

const rootStyle = computed(() => ({
  "--hp-line": props.line,
  "--hp-hole": props.hole,
  "--hp-stroke": props.stroke,
} as Record<string, string>));

const clusterStyle = (c: PreparedCluster) => ({
  left: `${c.x}%`,
  top: `${c.y}%`,
  width: `${c.width}px`,
  height: `${c.height}px`,
  opacity: c.opacity,
  transform: `translate(-50%, -50%) rotate(${c.rotation}deg)`,
  "--hp-cell": `${c.cell}px`,
  ...(c.mask ? { "--hp-mask": c.mask } : {}),
} as Record<string, string | number>);

const hexStyle = (c: PreparedCluster, h: PreparedHex) => ({
  left: `${c.width / 2 + h.dx}px`,
  top: `${c.height / 2 + h.dy}px`,
});
</script>

<style scoped>
.hex-pattern {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}
.hex-cluster {
  position: absolute;
  -webkit-mask-image: var(--hp-mask, radial-gradient(closest-side, black 25%, rgba(0, 0, 0, 0.7) 55%, transparent 90%));
  mask-image: var(--hp-mask, radial-gradient(closest-side, black 25%, rgba(0, 0, 0, 0.7) 55%, transparent 90%));
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}
.hexagon {
  position: absolute;
  width: var(--hp-cell);
  height: var(--hp-cell);
  background: var(--hp-line);
  clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
}
.hexagon::before {
  content: "";
  position: absolute;
  inset: var(--hp-stroke);
  background: var(--hp-hole);
  clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
}
</style>
