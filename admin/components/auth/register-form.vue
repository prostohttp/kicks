<script lang="ts" setup>
import { locale } from "~/lang/locale";
import * as v from "valibot";

// Emits
defineEmits(["submit"]);

// Store
const user = useAuthDataStore();
const settingsDataStore = useSettingsDataStore();
const { name, email, password, terms, keepLogged } = storeToRefs(user);

// Vars
const isOpen = ref(false);

// Schema
const schema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(3, locale[settingsDataStore.locale].error.stringMin),
  ),
  email: v.pipe(
    v.string(),
    v.email(locale[settingsDataStore.locale].error.invalidEmail),
  ),
  password: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(6, locale[settingsDataStore.locale].error.invalidPassword),
  ),
  terms: v.pipe(
    v.boolean(),
    v.custom(
      (value) => value === true,
      locale[settingsDataStore.locale].termsCheck,
    ),
  ),
  keepLogged: v.boolean(),
});
</script>

<template>
  <UForm
    class="flex flex-col gap-[24px]"
    @submit="
      $emit('submit', {
        name,
        email,
        password,
        terms,
        keepLogged,
      })
    "
    :schema="v.safeParser(schema)"
    :state="{
      name,
      email,
      password,
      terms,
      keepLogged,
    }"
  >
    <div class="flex flex-col gap-[20px]">
      <h1 class="font-[Rubik] font-[600] text-[24px]">
        {{ locale[settingsDataStore.locale].yourName }}
      </h1>
      <UFormGroup name="name">
        <UInput
          variant="outline"
          :placeholder="locale[settingsDataStore.locale].userName"
          v-model="name"
          input-class="input"
        />
      </UFormGroup>
    </div>
    <div class="flex flex-col gap-[20px]">
      <h1 class="font-[Rubik] font-[600] text-[24px]">
        {{ locale[settingsDataStore.locale].loginDetails }}
      </h1>
      <UFormGroup name="email">
        <UInput
          variant="outline"
          :placeholder="locale[settingsDataStore.locale].email"
          v-model="email"
          input-class="input"
        />
      </UFormGroup>
      <div class="flex flex-col gap-[5px]">
        <UFormGroup name="password">
          <UInput
            type="password"
            variant="outline"
            :placeholder="locale[settingsDataStore.locale].password"
            v-model="password"
            input-class="input"
          />
        </UFormGroup>
      </div>
    </div>
    <div class="flex flex-col gap-[20px]">
      <UFormGroup name="terms">
        <UCheckbox v-model="terms">
          <template #label>
            <span class="open-sans text-[16px] font-[600]">
              {{ locale[settingsDataStore.locale].agreeText }}
              <small
                @click.prevent="isOpen = true"
                class="text-[16px] underline decoration-gray-main hover: cursor-pointer"
              >
                {{ locale[settingsDataStore.locale].terms }}
              </small></span
            >
          </template>
        </UCheckbox>
      </UFormGroup>
      <UFormGroup name="keepLogged">
        <UCheckbox v-model="keepLogged">
          <template #label>
            <span class="open-sans text-[16px] font-[600]">
              {{ locale[settingsDataStore.locale].keepLogin }}
            </span>
          </template>
        </UCheckbox>
      </UFormGroup>
      <UButton
        type="submit"
        class="h-[48px] px-[16px] flex justify-between dark:hover:bg-dark-gray dark:hover:text-fa-white dark:bg-yellow"
        trailing
      >
        <span>{{ locale[settingsDataStore.locale].register }}</span>
        <UIcon name="i-mdi-arrow-right" dynamic class="text-[20px]" />
      </UButton>
      <UButton
        to="/auth/login"
        class="inverse h-[48px] px-[16px] flex justify-between w-full dark:hover:bg-dark-gray dark:hover:text-fa-white dark:bg-yellow uppercase font-[Rubik] bg-yellow hover:text-fa-white hover:bg-dark-gray"
        trailing
      >
        <span>{{ locale[settingsDataStore.locale].loginPage }}</span>
        <UIcon name="i-mdi-arrow-right" dynamic class="text-[20px]" />
      </UButton>
    </div>
  </UForm>
  <UiModal
    v-model="isOpen"
    title="KicksClub Terms & Conditions"
    class="dark:text-white"
    fullscreen
  >
    <ContentDoc path="/terms" />
  </UiModal>
</template>
