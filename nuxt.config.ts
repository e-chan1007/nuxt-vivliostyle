import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2024-12-29",

  modules: ["@nuxt/content"],

  routeRules: {
    "/raw/**": {
      experimentalNoScripts: true,
    },
  },

  content: {
    markdown: {
      anchorLinks: false,
    },
  },

  nitro: {
    preset: "static",
    prerender: {
      autoSubfolderIndex: false,
    },
  },

  vite: {
    server: {
      hmr: false,
    }
  },

  experimental: {
    noVueServer: true,
  },

  future: {
    compatibilityVersion: 4,
  },
});
