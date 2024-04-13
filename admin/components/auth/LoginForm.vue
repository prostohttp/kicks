<script lang="ts" setup>
	import { schema } from "~/components/auth/schemas/login.schema";

	// Emits
	defineEmits(["submit"]);

	// stores
	const user = useAuthDataStore();
	const { email, password, keepLogged } = storeToRefs(user);

	// vars
	const isOpen = ref(false);
</script>

<template>
	<UForm
		class="flex flex-col gap-[24px]"
		@submit="$emit('submit', { email, password, keepLogged })"
		:schema="schema"
		:state="{
			email,
			password,
			keepLogged,
		}"
	>
		<div class="flex flex-col gap-[24px]">
			<UFormGroup name="email">
				<UInput variant="outline" placeholder="Email" v-model="email" />
			</UFormGroup>
			<UFormGroup name="password">
				<UInput
					type="password"
					variant="outline"
					placeholder="Password"
					v-model="password"
				/>
			</UFormGroup>
			<UFormGroup name="keepLogged">
				<UCheckbox v-model="keepLogged">
					<template #label>
						<span class="font-[OpenSans] text-[16px] font-[600]"
							>Keep me logged in - applies to all log in options below.
							<small
								@click.prevent="isOpen = true"
								class="text-[16px] underline decoration-gray-main hover: cursor-pointer"
							>
								More info.
							</small></span
						>
					</template>
				</UCheckbox>
			</UFormGroup>
		</div>
		<div class="flex flex-col gap-[20px]">
			<UButton
				type="submit"
				class="h-[48px] px-[16px] flex justify-between"
				trailing
			>
				<span>Login</span>
				<UIcon name="i-mdi-arrow-right" dynamic class="text-[20px]" />
			</UButton>
			<ULink :to="{ name: 'register' }">
				<UButton
					class="inverse h-[48px] px-[16px] flex justify-between w-full"
					trailing
				>
					<span>Register page</span>
					<UIcon name="i-mdi-arrow-right" dynamic class="text-[20px]" />
				</UButton>
			</ULink>
		</div>
	</UForm>
	<UiModal v-model="isOpen" title="More Info">
		<ContentDoc path="/auth-info" />
	</UiModal>
</template>
