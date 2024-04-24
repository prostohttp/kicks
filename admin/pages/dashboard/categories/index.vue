<script lang="ts" setup>
	import { Constants } from "~/constants";

	// meta
	definePageMeta({
		layout: "dashboard",
		name: "all-categories",
	});
	useHead({
		title: "All categories",
	});

	// vars
	const currentPage = ref(1);
	const perPage = ref(Constants.PER_PAGE_CAT);

	// handlers

	// hooks
</script>

<template>
	<div>
		<h1>All categories</h1>
		<pre></pre>
	</div>
</template>
