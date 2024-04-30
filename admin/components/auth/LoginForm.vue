<script lang="ts" setup>
import { schema } from "~/components/auth/schemas/login.schema";

// Emits
defineEmits(["submit"]);

// stores
const user = useAuthDataStore();
const { email, password } = storeToRefs(user);
</script>

<template>
  <UForm
    class="flex flex-col gap-[24px]"
    @submit="$emit('submit', { email, password })"
    :schema="schema"
    :state="{
      email,
      password,
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
</template>
