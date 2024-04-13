<script lang="ts" setup>
	import { useThrottleFn } from "@vueuse/core";
	import { Roles, type RegisterFormDto } from "~/types";

	// Meta
	definePageMeta({
		layout: "auth",
		name: "register",
	});
	useHead({
		title: "Register",
	});

	// vars
	const toast = useToast();

	// Handlers
	const registerHandler = useThrottleFn(async (data: RegisterFormDto) => {
		try {
			await $fetch("/api/auth/register", {
				method: "POST",
				body: {
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					password: data.password,
					keepLogged: data.keepLogged,
					role: Roles.USER,
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
