<script lang="ts" setup>
import { schema } from "~/components/auth/schema/login.schema";
import { eng } from "~/lang/eng";

// Emits
defineEmits(["submit"]);

// store
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
        <UInput
          variant="outline"
          placeholder="Email"
          v-model="email"
          input-class="input"
        />
      </UFormGroup>
      <UFormGroup name="password">
        <UInput
          type="password"
          variant="outline"
          placeholder="Password"
          v-model="password"
          input-class="input"
        />
      </UFormGroup>
    </div>
    <div class="flex flex-col gap-[20px]">
      <UButton
        type="submit"
        class="h-[48px] px-[16px] flex justify-between dark:hover:bg-dark-gray dark:hover:text-fa-white dark:bg-yellow"
        trailing
      >
        <span>{{ eng.login }}</span>
        <UIcon name="i-mdi-arrow-right" dynamic class="text-[20px]" />
      </UButton>
      <UButton
        to="/auth/register"
        class="inverse h-[48px] px-[16px] flex justify-between w-full dark:hover:bg-dark-gray dark:hover:text-fa-white dark:bg-yellow uppercase font-[Rubik] bg-yellow hover:text-fa-white hover:bg-dark-gray"
        trailing
      >
        <span>{{ eng.registerPage }}</span>
        <UIcon name="i-mdi-arrow-right" dynamic class="text-[20px]" />
      </UButton>
    </div>
  </UForm>
</template>
