<template>
  <footer class="site-footer">
    <div class="site-footer-inner">
      <nav class="site-socials" aria-label="Contact links">
        <a
          v-for="s in socials"
          :key="s.label"
          :href="s.href"
          :target="s.href.startsWith('http') ? '_blank' : undefined"
          rel="noreferrer"
          :aria-label="s.label"
        >
          <Icon :name="s.icon" />
        </a>
      </nav>
      <p class="site-email">
        <a :href="`mailto:${email}`">{{ email }}</a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const socials = useSocials();
const email = "reachoutshahid@proton.me";
</script>

<style scoped>
.site-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding: 3.5rem 1.5rem 4.5rem;
  background: transparent;
}
.site-footer-inner {
  max-width: 68rem;
  margin: 0 auto;
  text-align: center;
}
.site-socials {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  font-size: 20px;
}
.site-socials a {
  color: var(--color-ink);
  transition: color 0.3s ease;
  display: inline-flex;
  padding: 0.6rem;
}
.site-socials a:hover {
  color: var(--color-accent-hover);
}
.site-email {
  margin: 1.25rem 0 0;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  color: rgba(0, 0, 0, 0.6);
}
.site-email a {
  color: var(--color-accent);
  text-decoration: none;
  border-bottom: 1px solid rgba(30, 64, 175, 0.4);
  padding-bottom: 0.1rem;
  transition: color 0.3s ease, border-color 0.3s ease;
}
.site-email a:hover {
  color: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
}

@media (min-width: 768px) {
  body:has(.hero-shell[data-state="sidebar"]) .site-footer {
    margin-left: 60px;
    width: calc(100% - 60px);
    box-sizing: border-box;
  }
}
</style>
