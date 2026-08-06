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
    </div>
  </footer>
</template>

<script setup lang="ts">
const socials = useSocials();
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

@media (min-width: 768px) {
  /* desktop keeps its socials in the sidebar rail — footer is mobile-only */
  .site-footer {
    display: none;
  }
}
</style>
