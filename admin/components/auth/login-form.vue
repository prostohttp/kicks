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
        class="flex flex-col gap-[24px]"
        @submit="$emit('submit', { email, password })"
        :schema="v.safeParser(schema)"
        :state="{
            email,
            password,
        }"
    >
        <div class="flex flex-col gap-[24px]">
            <UFormGroup name="email">
                <UInput
                    variant="outline"
                    :placeholder="locale[settingsDataStore.locale].email"
                    v-model="email"
                    input-class="input"
                />
            </UFormGroup>
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
        <div class="flex flex-col gap-[20px]">
            <UButton
                type="submit"
                class="h-[48px] px-[16px] flex justify-between dark:hover:bg-dark-gray dark:hover:text-fa-white dark:bg-yellow"
                trailing
            >
                <span>{{ locale[settingsDataStore.locale].login }}</span>
                <UIcon name="i-mdi-arrow-right" dynamic class="text-[20px]" />
            </UButton>
            <UButton
                to="/auth/register"
                class="inverse h-[48px] px-[16px] flex justify-between w-full dark:hover:bg-dark-gray dark:hover:text-fa-white dark:bg-yellow uppercase font-[Rubik] bg-yellow hover:text-fa-white hover:bg-dark-gray"
                trailing
            >
                <span>{{ locale[settingsDataStore.locale].registerPage }}</span>
                <UIcon name="i-mdi-arrow-right" dynamic class="text-[20px]" />
            </UButton>
        </div>
    </UForm>
</template>
