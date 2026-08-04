import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "@nuxt/content",
  ],

  css: [
    "~/assets/css/main.css",
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

  content: {
    documentDriven: false,
    highlight: { theme: { default: "github-light" } },
  },

  nitro: {
    preset: "cloudflare-pages",
    prerender: { crawlLinks: true, routes: ["/"] },
  },

  app: {
    head: {
      title: "shhyd",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "shhyd's portfolio: journey, projects, and contact." },
      ],
      htmlAttrs: { lang: "en" },
    },
  },
});
