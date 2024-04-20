<script lang="ts" setup></script>

<template>
	<div>
		<DashboardSidebar />
		<div>
			<DashboardHeader />
			<slot />
			<DashboardFooter />
		</div>
	</div>
</template>
