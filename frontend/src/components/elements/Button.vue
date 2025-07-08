<script setup lang="ts">
const emit = defineEmits<{
	handler: [value?: number | string];
}>();
</script>

<template>
	<button class="button" @click="$emit('handler')">
		<slot name="leading" />
		<slot name="default" />
		<slot name="trailing" />
	</button>
</template>
