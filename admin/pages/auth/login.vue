<script lang="ts" setup>
	const { signIn } = useAuth();

	// Meta
	definePageMeta({
		layout: "auth",
		name: "login",
		auth: {
			unauthenticatedOnly: true,
			navigateAuthenticatedTo: "dashboard",
		},
	});

	useHead({
		title: "Login",
	});

	// Handlers
	const loginHandler = async (data: LoginFormDto) => {
		signIn("credentials", { username: data.email, password: data.password });
	};
	// Vars
	const isOpen = ref(false);
</script>

<template>
	<AuthSidebar />
	<div
		class="flex lg:pt-[40px] pb-[40px] pt-[40px] lg:px-0 px-[30px] justify-center items-center"
	>
		<div class="max-w-[480px] flex flex-col w-full gap-[24px]">
			<div>
				<h1 class="font-[Rubik] font-[600] text-[36px] mb-[8px]">Login</h1>
				<ULink
					:to="{ name: 'forgot' }"
					class="font-[OpenSans] text-[16px] font-[600] underline decoration-gray-main"
					>Forgot your password?</ULink
				>
			</div>
			<AuthLoginForm @submit="loginHandler" />
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
