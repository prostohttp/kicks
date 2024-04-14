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
	pages: {
		signIn: "/auth/login",
	},
	providers: [
		// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		YandexProvider.default({
			clientId: "047157328f4c48a0b0eea6cb1c7ce40b",
			clientSecret: "2a86a1bcc67445b581c58d33ac317fd2",
		}),
		// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		DiscordProvider.default({
			clientId: "1228646007865348116",
			clientSecret: "zF7HCRpPrAgBvtECcPjzhe97-4pB0PN4",
		}),
		// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		GitHubProvider.default({
			clientId: "053b5a2a36ac7b612208",
			clientSecret: "066405e640c0dbd758b91ef462200505e7313ab8",
		}),
		// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		CredentialsProvider.default({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: "Credentials",
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
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
