<script setup lang="ts">
type BadgeVariant = "dark" | "light";
defineProps<{ variant?: BadgeVariant }>();
</script>

<template>
	<span
		class="font-theme-inter text-[14px] px-[12px] py-[8px] rounded-[20px]"
		:class="{
			'text-theme-white bg-theme-black': variant === 'dark',
			'text-theme-black bg-[#E9E9EA]': variant === 'light',
		}"
	>
		<slot></slot>
	</span>
</template>
