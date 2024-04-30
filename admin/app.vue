<script lang="ts" setup>
useSeoMeta({
  ogImage: "/public/favicon.png",
});
useHead({
  titleTemplate: "%s - Kicks admin panel",
});
</script>

<template>
  <div class="w-full max-w-[1440px] mx-auto">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>

// TODO: Подумать стоит ли использовать анимацию
<style>
/* .page-enter-active,
	.page-leave-active,
	.layout-enter-active,
	.layout-leave-active {
		transition: all 0.1s;
	}
	.page-enter-from,
	.page-leave-to,
	.layout-enter-from,
	.layout-leave-to {
		opacity: 0.8;
	} */
</style>
