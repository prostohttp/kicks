<script lang="ts" setup>
	const { signIn } = useAuth();
</script>

<template>
	<div class="flex justify-between gap-[5px] sm:gap-[24px]">
		<AuthSocialButton
			@click="signIn('github')"
			link="https:github.com"
			title="Log in with Github"
		>
			<img
				src="/assets/img/icon-github.svg"
				class="scale-[270%] sm:scale-[230%]"
			/>
		</AuthSocialButton>
		<AuthSocialButton title="Log in with Ya.ru" @click="signIn('yandex')">
			<img
				src="/assets/img/icon-yandex.svg"
				class="scale-100 sm:scale-[140%]"
			/>
		</AuthSocialButton>
		<AuthSocialButton title="Log in with Mail.ru" @click="signIn('mailru')">
			<img
				src="/assets/img/icon-mailru.svg"
				class="scale-100 sm:scale-[350%]"
			/>
		</AuthSocialButton>
	</div>
</template>
