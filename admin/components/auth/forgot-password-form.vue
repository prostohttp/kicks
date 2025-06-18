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
        :schema="v.safeParser(schema)"
        :state="{
            email,
        }"
        class="flex flex-col gap-[24px]"
        @submit="$emit('submit', { email })"
    >
        <div class="flex flex-col gap-[24px]">
            <UFormGroup name="email">
                <UInput
                    v-model="email"
                    input-class="input"
                    placeholder="Email"
                    variant="outline"
                />
            </UFormGroup>
        </div>
        <div class="flex flex-col gap-[20px]">
            <UButton
                class="h-[48px] px-[16px] flex justify-between dark:hover:bg-dark-gray dark:bg-yellow dark:hover:text-fa-white"
                trailing
                type="submit"
            >
                <span>{{
                    locale[settingsDataStore.locale].resetPassword
                }}</span>
                <UIcon class="text-[20px]" dynamic name="i-mdi-arrow-right" />
            </UButton>
            <UButton
                class="inverse h-[48px] px-[16px] flex justify-between w-full dark:hover:bg-dark-gray dark:bg-yellow dark:hover:text-fa-white font-[Rubik] uppercase bg-yellow hover:text-fa-white hover:bg-dark-gray"
                to="/auth/login"
                trailing
            >
                <span>{{ locale[settingsDataStore.locale].loginPage }}</span>
                <UIcon class="text-[20px]" dynamic name="i-mdi-arrow-right" />
            </UButton>
        </div>
    </UForm>
    <UiModal v-model="isOpen" class="dark:text-white" title="More Info">
        <ContentDoc path="/auth-info" />
    </UiModal>
</template>
