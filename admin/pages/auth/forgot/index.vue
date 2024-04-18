<script lang="ts" setup>
	import { useThrottleFn } from "@vueuse/core";
	import type { ForgotFormDto } from "~/types";

	// Meta
	definePageMeta({
		layout: "auth",
		name: "forgot",
		auth: {
			unauthenticatedOnly: true,
			navigateAuthenticatedTo: "/dashboard",
		},
		alias: ["/forgot"],
	});
	useHead({
		title: "Forgot password",
	});

	// Vars
	const isOpen = ref(false);
	const toast = useToast();

	// Handlers
	const forgot = async (data: ForgotFormDto) => {
		try {
			await $fetch("/api/auth/forgot", {
				method: "POST",
				body: data,
			});
		} catch (error: any) {
			toast.add({ title: error.statusMessage });
		}
	};
	const forgotHandler = useThrottleFn(forgot, 1000);
</script>

<template>
	<AuthSidebar />
	<div
		class="flex lg:pt-[40px] pb-[40px] pt-[40px] lg:px-0 px-[30px] justify-center items-center"
	>
		<div class="max-w-[480px] flex flex-col w-full gap-[24px]">
			<div>
				<h1 class="font-[Rubik] font-[600] text-[36px] mb-[8px]">
					Forgot password
				</h1>
			</div>
			<AuthForgotPasswordForm @submit="forgotHandler" />
			<AuthSocialButtons />
			<span
				class="font-[OpenSans] text-[16px] font-[600] underline decoration-gray-main hover: cursor-pointer"
				@click.prevent="isOpen = true"
				>KicksClub Terms & Conditions, Kicks Privacy Notice and Terms &
				Conditions. By clicking 'Log In' you agree to our website</span
			>
		</div>
	</div>
	<UiModal v-model="isOpen" title="KicksClub Terms & Conditions" fullscreen>
		<ContentDoc path="/terms" />
	</UiModal>
</template>
