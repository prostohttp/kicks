import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
		},
	},
	runtimeConfig: {
		GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
		YANDEX_CLIENT_SECRET: process.env.YANDEX_CLIENT_SECRET,
		DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
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
	},
	css: ["~/assets/css/main.css"],
	devtools: { enabled: true },
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
		baseUrl: process.env.SITE_URL,
		autoImport: true,
	},
	modules: [
		"@nuxt/ui",
		"@nuxt/image",
		"@vueuse/nuxt",
		"@nuxtjs/i18n",
		"nuxt-mongoose",
		"@pinia/nuxt",
		"@nuxt/content",
		"@sidebase/nuxt-auth",
		"@vue-email/nuxt",
	],
});
