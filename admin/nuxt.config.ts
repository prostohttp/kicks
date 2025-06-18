// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    experimental: {
        typedPages: true,
    },

    app: {
        head: {
            link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
        },
    },

    runtimeConfig: {
        NUXT_GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        NUXT_YANDEX_CLIENT_SECRET: process.env.YANDEX_CLIENT_SECRET,
        NUXT_DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
        NUXT_AUTH_SECRET: process.env.AUTH_SECRET,
        NUXT_RESEND_API_KEY: process.env.RESEND_API_KEY,
        public: {
            NUXT_GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
            NUXT_YANDEX_CLIENT_ID: process.env.YANDEX_CLIENT_ID,
            NUXT_DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
        },
    },

    nitro: {
        imports: {
            dirs: ["types/**", "server/models"],
        },
        storage: {
            fs: {
                driver: "fs",
                base: "./public",
            },
        },
    },

    css: ["~/assets/css/main.css"],
    devtools: {
        enabled: true,
    },

    auth: {
        baseURL: process.env.SITE_URL,
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

    googleFonts: {
        families: {
            Inter: [400, 500],
            "Open Sans": [400, 500, 600],
            Poppins: [400],
            Rubik: [400, 500, 600, 700, 900],
        },
    },

    modules: [
        "@vueuse/nuxt",
        "nuxt-mongoose",
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
        "@nuxt/content",
        "@sidebase/nuxt-auth",
        "@vue-email/nuxt",
        "@nuxt/ui",
        "@nuxtjs/google-fonts",
        "nuxt-tiptap-editor",
        "@nuxt/image",
    ],

    tiptap: {
        prefix: "Tiptap",
    },

    compatibilityDate: "2024-07-03",
});
