<script lang="ts" setup>
	const { signOut } = useAuth();
	// Meta
	definePageMeta({
		layout: "dashboard",
		name: "dashboard",
	});
	useHead({
		title: "Dashboard",
	});

	// Stores

	// Vars

	// Handlers
	const logOutHandler = () => {
		signOut({ callbackUrl: "/login" });
	};
</script>

<template>
	<div>
		<h1 class="text-3xl">Dashboard</h1>
		<UButton @click="logOutHandler">Log Out</UButton>
	</div>
</template>
