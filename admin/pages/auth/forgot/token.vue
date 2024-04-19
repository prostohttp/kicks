<script lang="ts" setup>
	import { useThrottleFn } from "@vueuse/core";
	import ResetPasswordForm from "~/components/auth/ResetPasswordForm.vue";
	import type { ResetPasswordDto } from "~/types";

	// Meta
	definePageMeta({
		layout: "auth",
		name: "reset-password",
		auth: {
			unauthenticatedOnly: true,
			navigateAuthenticatedTo: "/dashboard",
		},
		middleware: ["reset-password-middleware"],
		alias: ["/token"],
	});
	useHead({
		title: "Reset password",
	});

	// Vars
	const toast = useToast();
	const router = useRouter();
	const route = useRoute();

	// Handlers
	const resetPassword = async (data: ResetPasswordDto) => {
		const { password } = data;
		try {
			await $fetch("/api/auth/reset-password", {
				method: "PUT",
				body: {
					email: "info@kicks.club",
					password,
				},
			});
			toast.add({
				title: "Password changed, now you can Login",
				click: () => {
					router.push({ name: "login" });
				},
				callback() {
					router.push({ name: "login" });
				},
			});
		} catch (error) {}
	};
	const resetPasswordHandler = useThrottleFn(resetPassword, 1000);

	// Hooks
	onMounted(() => {
		console.log("token", route.query.token);
		console.log("timestamp", route.query.timestamp);
	});
</script>

<template>
	<AuthSidebar />
	<div
		class="flex lg:pt-[40px] pb-[40px] pt-[40px] lg:px-0 px-[30px] justify-center items-center"
	>
		<div class="max-w-[480px] flex flex-col w-full gap-[24px]">
			<div>
				<h1 class="font-[Rubik] font-[600] text-[36px] mb-[8px]">
					Reset password
				</h1>
			</div>
			<ResetPasswordForm @submit="resetPasswordHandler" />
		</div>
	</div>
</template>
