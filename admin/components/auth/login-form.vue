<script lang="ts" setup>
import { locale } from "~/lang/locale";
import * as v from "valibot";

// Emits
defineEmits(["submit"]);

// store
const user = useAuthDataStore();
const settingsDataStore = useSettingsDataStore();
const { email, password } = storeToRefs(user);

// vars
const schema = v.object({
    email: v.pipe(
        v.string(),
        v.email(locale[settingsDataStore.locale].error.invalidEmail),
    ),
    password: v.pipe(
        v.string(),
        v.minLength(6, locale[settingsDataStore.locale].error.invalidPassword),
    ),
});
</script>

<template>
    <UForm
        :schema="v.safeParser(schema)"
        :state="{
            email,
            password,
        }"
        class="flex flex-col gap-[24px]"
        @submit="$emit('submit', { email, password })"
    >
        <div class="flex flex-col gap-[24px]">
            <UFormGroup name="email">
                <UInput
                    v-model="email"
                    :placeholder="locale[settingsDataStore.locale].email"
                    input-class="input"
                    variant="outline"
                />
            </UFormGroup>
            <UFormGroup name="password">
                <UInput
                    v-model="password"
                    :placeholder="locale[settingsDataStore.locale].password"
                    input-class="input"
                    type="password"
                    variant="outline"
                />
            </UFormGroup>
        </div>
        <div class="flex flex-col gap-[20px]">
            <UButton
                class="h-[48px] px-[16px] flex justify-between dark:hover:bg-dark-gray dark:hover:text-fa-white dark:bg-yellow"
                trailing
                type="submit"
            >
                <span>{{ locale[settingsDataStore.locale].login }}</span>
                <UIcon class="text-[20px]" dynamic name="i-mdi-arrow-right" />
            </UButton>
            <UButton
                class="inverse h-[48px] px-[16px] flex justify-between w-full dark:hover:bg-dark-gray dark:hover:text-fa-white dark:bg-yellow uppercase font-[Rubik] bg-yellow hover:text-fa-white hover:bg-dark-gray"
                to="/auth/register"
                trailing
            >
                <span>{{ locale[settingsDataStore.locale].registerPage }}</span>
                <UIcon class="text-[20px]" dynamic name="i-mdi-arrow-right" />
            </UButton>
        </div>
    </UForm>
</template>
