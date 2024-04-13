import { defineNuxtConfig } from "nuxt/config";
import { ADMIN } from "./constants";

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
		componentIslands: true,
	},
	auth: {
		provider: {
			type: "authjs",
		},
	},
	mongoose: {
		uri: process.env.MONGODB_URI,
		devtools: true,
	},
	pinia: {
		storesDirs: ["./stores/**"],
	},
	modules: [
		"@nuxt/ui",
		"@nuxt/image",
		"@vueuse/nuxt",
		"@nuxtjs/i18n",
		"nuxt-mongoose",
		"@pinia/nuxt",
		"@nuxt/content",
		[
			"nuxt-mail",
			{
				message: {
					to: ADMIN.EMAIL,
				},
				smtp: {
					host: ADMIN.SMTP_HOST,
					port: ADMIN.SMTP_PORT,
				},
			},
		],
		"@sidebase/nuxt-auth",
	],
});
