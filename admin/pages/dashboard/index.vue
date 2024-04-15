<script lang="ts" setup>
	const { signOut, data, status, getSession } = useAuth();
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
		<h2>
			<pre>{{ data }}</pre>
		</h2>
		<h2>
			<pre>{{ status }}</pre>
		</h2>
		<h2>
			<pre>{{ getSession }}</pre>
		</h2>
		<UButton @click="logOutHandler">Log Out</UButton>
	</div>
</template>
