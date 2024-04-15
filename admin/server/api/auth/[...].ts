// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import YandexProvider from "next-auth/providers/yandex";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import { type LoginFormDto } from "~/types";
import bcrypt from "bcrypt";

const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
	secret: runtimeConfig.AUTH_SECRET,
	session: {
		maxAge: 24 * 60 * 60,
	},
	pages: {
		signIn: "/auth/login",
	},
	providers: [
		// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		YandexProvider.default({
			clientId: runtimeConfig.public.YANDEX_CLIENT_ID,
			clientSecret: runtimeConfig.YANDEX_CLIENT_SECRET,
		}),
		// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		DiscordProvider.default({
			clientId: runtimeConfig.public.DISCORD_CLIENT_ID,
			clientSecret: runtimeConfig.DISCORD_CLIENT_SECRET,
		}),
		// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		GitHubProvider.default({
			clientId: runtimeConfig.public.GITHUB_CLIENT_ID,
			clientSecret: runtimeConfig.GITHUB_CLIENT_SECRET,
		}),
		// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		CredentialsProvider.default({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},
			async authorize(credentials: LoginFormDto) {
				const existingUser = await User.findOne({ email: credentials.email });
				if (!existingUser) {
					return null;
				}
				const isPasswordMatch = await bcrypt.compare(
					credentials.password,
					existingUser.password.toString()
				);
				if (isPasswordMatch) {
					return existingUser;
				} else {
					return null;
				}
			},
		}),
	],
});
