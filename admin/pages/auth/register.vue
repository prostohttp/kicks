<script lang="ts" setup>
	import { useThrottleFn } from "@vueuse/core";
	import { Constants } from "~/constants";
	const { signIn } = useAuth();
	import { Roles, type RegisterFormDto } from "~/types";

	// Meta
	definePageMeta({
		layout: "auth",
		name: "register",
		auth: {
			unauthenticatedOnly: true,
			navigateAuthenticatedTo: "/dashboard",
		},
		alias: ["/register"],
	});
	useHead({
		title: "Register",
	});

	// vars
	const toast = useToast();
	const router = useRouter();

	// Handlers
	const registerHandler = useThrottleFn(async (data: RegisterFormDto) => {
		const { firstName, lastName, email, password, keepLogged } = data;
		try {
			await $fetch("/api/auth/register", {
				method: "POST",
				body: {
					firstName,
					lastName,
					email,
					password,
					role: Roles.USER,
					keepLogged,
				},
			});
			if (data.keepLogged) {
				signIn("credentials", {
					email: data.email,
					password: data.password,
				});
			} else {
				toast.add({
					title: "You are have been registered and now you can login",
					callback: () => {
						router.push({ name: "login" });
					},
				});
			}
			await $fetch("/api/register-send-email", {
				method: "POST",
				body: {
					userFirstName: firstName,
					userLastName: lastName,
					userEmail: email,
					siteName: Constants.SITE_NAME,
					siteUrl: Constants.SITE_URL,
				},
			});
		} catch (error: any) {
			toast.add({ title: error.statusMessage });
		}
	}, 1000);
</script>

<template>
	<AuthSidebar />
	<div class="flex py-[10px] lg:px-0 px-[30px] justify-center items-center">
		<div class="max-w-[480px] flex flex-col w-full gap-[24px]">
			<div>
				<h1 class="font-[Rubik] font-[600] text-[36px]">Register</h1>
				<h2 class="font-[OpenSans] text-[20px] font-[600]">Sign up with</h2>
			</div>
			<AuthSocialButtons />
			<h2 class="font-[OpenSans] text-[20px] font-[600] uppercase">OR</h2>
			<AuthRegisterForm @submit="registerHandler" />
		</div>
	</div>
</template>
