<script lang="ts" setup>
	import { schema } from "~/components/auth/schemas/reset-password.schema";

	// Emits
	defineEmits(["submit"]);

	// vars
	const password = ref("");
</script>

<template>
	<UForm
		class="flex flex-col gap-[24px]"
		@submit="$emit('submit', { password })"
		:schema="schema"
		:state="{
			password,
		}"
	>
		<div class="flex flex-col gap-[24px]">
			<UFormGroup name="password">
				<UInput
					variant="outline"
					placeholder="Password"
					v-model="password"
					type="password"
				/>
			</UFormGroup>
		</div>
		<div class="flex flex-col gap-[20px]">
			<UButton
				type="submit"
				class="h-[48px] px-[16px] flex justify-between"
				trailing
			>
				<span>Reset Password</span>
				<UIcon name="i-mdi-arrow-right" dynamic class="text-[20px]" />
			</UButton>
		</div>
	</UForm>
</template>
