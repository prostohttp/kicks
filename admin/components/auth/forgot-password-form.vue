<script lang="ts" setup>
import { locale } from "~/lang/locale";
import * as v from "valibot";

// Emits
defineEmits(["submit"]);

// store
const user = useAuthDataStore();
const settingsDataStore = useSettingsDataStore();
const { email } = storeToRefs(user);

// vars
const isOpen = ref(false);
const schema = v.object({
  email: v.pipe(
    v.string(),
    v.email(locale[settingsDataStore.locale].error.invalidEmail),
  ),
});
</script>

<template>
  <UForm
    class="flex flex-col gap-[24px]"
    @submit="$emit('submit', { email })"
    :schema="v.safeParser(schema)"
    :state="{
      email,
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
    </div>
    <div class="flex flex-col gap-[20px]">
      <UButton
        type="submit"
        class="h-[48px] px-[16px] flex justify-between dark:hover:bg-dark-gray dark:bg-yellow dark:hover:text-fa-white"
        trailing
      >
        <span>{{ locale[settingsDataStore.locale].resetPassword }}</span>
        <UIcon name="i-mdi-arrow-right" dynamic class="text-[20px]" />
      </UButton>
      <UButton
        to="/auth/login"
        class="inverse h-[48px] px-[16px] flex justify-between w-full dark:hover:bg-dark-gray dark:bg-yellow dark:hover:text-fa-white font-[Rubik] uppercase bg-yellow hover:text-fa-white hover:bg-dark-gray"
        trailing
      >
        <span>{{ locale[settingsDataStore.locale].loginPage }}</span>
        <UIcon name="i-mdi-arrow-right" dynamic class="text-[20px]" />
      </UButton>
    </div>
  </UForm>
  <UiModal v-model="isOpen" title="More Info" class="dark:text-white">
    <ContentDoc path="/auth-info" />
  </UiModal>
</template>
