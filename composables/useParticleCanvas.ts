import { onMounted, onBeforeUnmount, type Ref } from "vue";

interface P {
  x: number;
  y: number;
  baseSize: number;
  size: number;
  sizeDirection: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeDirection: number;
  fadeSpeed: number;
}

export function useParticleCanvas(canvasRef: Ref<HTMLCanvasElement | null>) {
  let raf = 0;
  const particles: P[] = [];

  const init = (canvas: HTMLCanvasElement) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 30000));
    particles.length = 0;
    for (let i = 0; i < count; i++) {
      const baseSize = Math.random() * 1.5 + 0.5;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseSize,
        size: baseSize,
        sizeDirection: Math.random() > 0.5 ? 1 : -1,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        opacity: 0.01 * Math.random() + 0.01,
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
        fadeSpeed: 0.0001 * Math.random(),
      });
    }
  };

  onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => init(canvas);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        p.size += p.sizeDirection * 0.001;
        if (p.size >= p.baseSize * 1.5) p.sizeDirection = -1;
        if (p.size <= p.baseSize * 0.5) p.sizeDirection = 1;

        p.opacity += p.fadeDirection * p.fadeSpeed;
        if (p.opacity <= 0.01) {
          p.opacity = 0.01;
          p.fadeDirection = 1;
        }
        if (p.opacity >= 0.05) {
          p.opacity = 0.05;
          p.fadeDirection = -1;
        }

        ctx.fillStyle = `rgba(30, 64, 175, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    loop();
    window.addEventListener("resize", resize, { passive: true });
    onBeforeUnmount(() => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      particles.length = 0;
    });
  });
}
