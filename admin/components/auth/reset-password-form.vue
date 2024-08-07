<script lang="ts" setup>
import * as v from "valibot";
import { locale } from "~/lang/locale";

// store
const settingsDataStore = useSettingsDataStore();

// Emits
defineEmits(["submit"]);

// vars
const password = ref("");
const schema = v.object({
  password: v.pipe(
    v.string(),
    v.minLength(6, locale[settingsDataStore.locale].error.invalidPassword),
  ),
});
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
          input-class="input"
        />
      </UFormGroup>
    </div>
    <div class="flex flex-col gap-[20px]">
      <UButton
        type="submit"
        class="h-[48px] px-[16px] flex justify-between dark:hover:bg-dark-gray dark:hover:text-fa-white bg-yellow hover:text-fa-white hover:bg-dark-gray"
        trailing
      >
        <span>{{ locale[settingsDataStore.locale].resetPassword }}</span>
        <UIcon name="i-mdi-arrow-right" dynamic class="text-[20px]" />
      </UButton>
    </div>
  </UForm>
</template>
