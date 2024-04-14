<script lang="ts" setup>
	useSeoMeta({
		ogImage: "/public/favicon.png",
	});
	useHead({
		titleTemplate: "%s - Kicks admin panel",
	});
</script>

<template>
	<NuxtLoadingIndicator />
	<div class="w-full max-w-[1440px] mx-auto">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
		<UNotifications />
	</div>
</template>
