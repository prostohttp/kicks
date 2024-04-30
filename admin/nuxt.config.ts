import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
    // TODO: Подумать стоит ли использовать анимацию
    // layoutTransition: { name: "layout", mode: "in-out" },
    // pageTransition: { name: "page", mode: "out-in" },
  },
  runtimeConfig: {
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    YANDEX_CLIENT_SECRET: process.env.YANDEX_CLIENT_SECRET,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    public: {
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
      YANDEX_CLIENT_ID: process.env.YANDEX_CLIENT_ID,
      DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    },
  },
  nitro: {
    imports: {
      dirs: ["./types"],
    },
    storage: {
      fs: {
        driver: "fs",
        base: "./public",
      },
    },
  },
  css: ["~/assets/css/main.css"],
  devtools: { enabled: false },
  experimental: {
    // componentIslands: true,
  },
  auth: {
    isEnabled: true,
    provider: {
      type: "authjs",
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    devtools: true,
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  vueEmail: {
    // baseUrl: Constants.SITE_URL,
    autoImport: true,
  },
  modules: [
    "@nuxt/image",
    "@vueuse/nuxt",
    "nuxt-mongoose",
    "@pinia/nuxt",
    "@nuxt/content",
    "@sidebase/nuxt-auth",
    "@vue-email/nuxt",
    "nuxt-aos",
    "@nuxt/ui",
  ],
});
