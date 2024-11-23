// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import YandexProvider from "next-auth/providers/yandex";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import { Roles, type LoginFormDto } from "~/types/server/server.types";

import bcrypt from "bcrypt";

const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
    secret: runtimeConfig.NUXT_AUTH_SECRET,
    session: {
        maxAge: 7 * 24 * 60 * 60,
    },
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            const isSignIn = user ? true : false;
            if (isSignIn) {
                token.role = user ? (user as any).role || "" : "";
            }
            return Promise.resolve(token);
        },
        // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
        async session({ session, token }) {
            (session as any).user.role = token.role || Roles.MANAGER;
            (session as any).user.isRegistered = !!token.role;
            return session;
        },
    },
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        YandexProvider.default({
            clientId: runtimeConfig.public.NUXT_YANDEX_CLIENT_ID,
            clientSecret: runtimeConfig.NUXT_YANDEX_CLIENT_SECRET,
        }),
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        DiscordProvider.default({
            clientId: runtimeConfig.public.NUXT_DISCORD_CLIENT_ID,
            clientSecret: runtimeConfig.NUXT_DISCORD_CLIENT_SECRET,
        }),
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GitHubProvider.default({
            clientId: runtimeConfig.public.NUXT_GITHUB_CLIENT_ID,
            clientSecret: runtimeConfig.NUXT_GITHUB_CLIENT_SECRET,
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
                const existingUser = await User.findOne({
                    email: credentials.email,
                });
                if (!existingUser) {
                    return null;
                }
                if (
                    existingUser &&
                    existingUser.role.toString() === Roles.CUSTOMER
                ) {
                    return null;
                }
                const isPasswordMatch = await bcrypt.compare(
                    credentials.password,
                    existingUser.password.toString(),
                );
                if (isPasswordMatch) {
                    return {
                        name: existingUser.name,
                        email: existingUser.email,
                        role: existingUser.role,
                    };
                } else {
                    return null;
                }
            },
        }),
    ],
});
