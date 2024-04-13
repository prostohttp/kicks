<script lang="ts" setup>
	import { schema } from "~/components/auth/schemas/register.schema";

	// Emits
	defineEmits(["submit"]);

	// Stores
	const user = useAuthDataStore();
	const { firstName, lastName, email, password, terms, keepLogged } =
		storeToRefs(user);

	// Vars
	const isOpen = ref(false);
</script>

<template>
	<UForm
		class="flex flex-col gap-[24px]"
		@submit="
			$emit('submit', {
				firstName,
				lastName,
				email,
				password,
				terms,
				keepLogged,
			})
		"
		:schema="schema"
		:state="{
			firstName,
			lastName,
			email,
			password,
			terms,
			keepLogged,
		}"
	>
		<div class="flex flex-col gap-[20px]">
			<h1 class="font-[Rubik] font-[600] text-[24px]">Your Name</h1>
			<UFormGroup name="firstName">
				<UInput
					variant="outline"
					placeholder="First Name *"
					v-model="firstName"
				/>
			</UFormGroup>
			<UFormGroup name="lastName">
				<UInput
					variant="outline"
					placeholder="Last Name *"
					v-model="lastName"
				/>
			</UFormGroup>
		</div>
		<div class="flex flex-col gap-[20px]">
			<h1 class="font-[Rubik] font-[600] text-[24px]">Login Details</h1>
			<UFormGroup name="email">
				<UInput variant="outline" placeholder="Email *" v-model="email" />
			</UFormGroup>
			<div class="flex flex-col gap-[5px]">
				<UFormGroup name="password">
					<UInput
						type="password"
						variant="outline"
						placeholder="Password *"
						v-model="password"
					/>
				</UFormGroup>
			</div>
		</div>
		<div class="flex flex-col gap-[20px]">
			<UFormGroup name="terms">
				<UCheckbox v-model="terms">
					<template #label>
						<span class="font-[OpenSans] text-[16px] font-[600]"
							>By clicking 'Log In' you agree to our website
							<small
								@click.prevent="isOpen = true"
								class="text-[16px] underline decoration-gray-main hover: cursor-pointer"
							>
								KicksClub Terms & Conditions, Kicks Privacy Notice and Terms &
								Conditions.
							</small></span
						>
					</template>
				</UCheckbox>
			</UFormGroup>
			<UFormGroup name="keepLogged">
				<UCheckbox v-model="keepLogged">
					<template #label>
						<span class="font-[OpenSans] text-[16px] font-[600]"
							>Keep me logged in - applies to all log in options below. More
							info</span
						>
					</template>
				</UCheckbox>
			</UFormGroup>
			<UButton
				type="submit"
				class="h-[48px] px-[16px] flex justify-between"
				trailing
			>
				<span>Register</span>
				<UIcon name="i-mdi-arrow-right" dynamic class="text-[20px]" />
			</UButton>
			<ULink :to="{ name: 'login' }">
				<UButton
					type="submit"
					class="inverse h-[48px] px-[16px] flex justify-between w-full"
					trailing
				>
					<span>Login page</span>
					<UIcon name="i-mdi-arrow-right" dynamic class="text-[20px]" />
				</UButton>
			</ULink>
		</div>
	</UForm>
	<UiModal v-model="isOpen" title="KicksClub Terms & Conditions" fullscreen>
		<ContentDoc path="/terms" />
	</UiModal>
</template>
