import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "@nuxt/icon",
    "@nuxtjs/sitemap",
    "@nuxt/content",
  ],

  site: {
    url: "https://shhyydh.pages.dev",
  },

  icon: {
    provider: "none",
    clientBundle: {
      icons: [
        "simple-icons:github",
        "simple-icons:linkedin",
        "simple-icons:substack",
        "mdi:email",
      ],
    },
  },

  css: [
    "~/assets/css/main.css",
    "~/assets/css/case.css",
    "@fontsource-variable/google-sans-flex/wght.css",
    "@fontsource-variable/google-sans-code",
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  experimental: {
    viewTransition: true,
    appManifest: false,
  },

  nitro: {
    preset: "cloudflare-pages",
    prerender: {
      crawlLinks: true,
      routes: ["/", "/blog", "/sitemap.xml"],
    },
  },

  app: {
    head: {
      title: "shhyydh's Portfolio",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "shhyydh's portfolio: journey, projects, and contact." },
      ],
      htmlAttrs: { lang: "en" },
    },
  },
});
