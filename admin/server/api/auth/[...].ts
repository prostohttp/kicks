// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from "#auth";
import YandexProvider from "next-auth/providers/yandex";
import MailRuProvider from "next-auth/providers/mailru";
import GitHubProvider from "next-auth/providers/github";

const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
	pages: {
		signIn: "auth/signin",
	},
	providers: [
		// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		YandexProvider.default({
			clientId: "ca6b8ffe50714d898b1b0e3dc71518de",
			clientSecret: "e7f221f243074b04b818946a68639ef4",
		}),
		// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		MailRuProvider.default({
			clientId: "35623a6e8dd047f7a8b3f7b945351f00",
			clientSecret: "3df3e2644de24d6cb78c575613474885",
		}),
		// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		GitHubProvider.default({
			clientId: "053b5a2a36ac7b612208",
			clientSecret: "066405e640c0dbd758b91ef462200505e7313ab8",
		}),
	],
});
