<script lang="ts" setup>
import { schema } from "~/components/auth/schema/register.schema";
import { locale } from "~/lang/locale";
import * as v from "valibot";

// Emits
defineEmits(["submit"]);

// Store
const user = useAuthDataStore();
const { name, email, password, terms, keepLogged } = storeToRefs(user);

// Vars
const isOpen = ref(false);
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
        {{ locale["en"].yourName }}
      </h1>
      <UFormGroup name="name">
        <UInput
          variant="outline"
          placeholder="Full Name *"
          v-model="name"
          input-class="input"
        />
      </UFormGroup>
    </div>
    <div class="flex flex-col gap-[20px]">
      <h1 class="font-[Rubik] font-[600] text-[24px]">
        {{ locale["en"].loginDetails }}
      </h1>
      <UFormGroup name="email">
        <UInput
          variant="outline"
          placeholder="Email *"
          v-model="email"
          input-class="input"
        />
      </UFormGroup>
      <div class="flex flex-col gap-[5px]">
        <UFormGroup name="password">
          <UInput
            type="password"
            variant="outline"
            placeholder="Password *"
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
              {{ locale["en"].agreeText }}
              <small
                @click.prevent="isOpen = true"
                class="text-[16px] underline decoration-gray-main hover: cursor-pointer"
              >
                {{ locale["en"].terms }}
              </small></span
            >
          </template>
        </UCheckbox>
      </UFormGroup>
      <UFormGroup name="keepLogged">
        <UCheckbox v-model="keepLogged">
          <template #label>
            <span class="open-sans text-[16px] font-[600]">
              {{ locale["en"].keepLogin }}
            </span>
          </template>
        </UCheckbox>
      </UFormGroup>
      <UButton
        type="submit"
        class="h-[48px] px-[16px] flex justify-between dark:hover:bg-dark-gray dark:hover:text-fa-white dark:bg-yellow"
        trailing
      >
        <span>{{ locale["en"].register }}</span>
        <UIcon name="i-mdi-arrow-right" dynamic class="text-[20px]" />
      </UButton>
      <UButton
        to="/auth/login"
        class="inverse h-[48px] px-[16px] flex justify-between w-full dark:hover:bg-dark-gray dark:hover:text-fa-white dark:bg-yellow uppercase font-[Rubik] bg-yellow hover:text-fa-white hover:bg-dark-gray"
        trailing
      >
        <span>{{ locale["en"].loginPage }}</span>
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
