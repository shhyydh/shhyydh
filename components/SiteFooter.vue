<template>
  <footer class="site-footer">
    <div class="site-footer-inner">
      <nav class="site-links" aria-label="Site links">
        <NuxtLink to="/blog" class="site-link">Blog</NuxtLink>
      </nav>
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
.site-links {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}
.site-link {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-ink);
  text-decoration: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 0.25rem;
  transition: color 0.3s ease, border-color 0.3s ease;
}
.site-link:hover {
  color: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
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
