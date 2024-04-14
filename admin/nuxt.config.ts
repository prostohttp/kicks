import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
		},
	},
	runtimeConfig: {
		public: {},
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
