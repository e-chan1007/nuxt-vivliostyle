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
    prerender: {
      autoSubfolderIndex: false,
    },
  },

  vite: {
    server: {
      hmr: false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },

  experimental: {
    noVueServer: true,
  },

  future: {
    compatibilityVersion: 4,
  },
});
