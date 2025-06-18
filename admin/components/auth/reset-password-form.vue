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
        :schema="schema"
        :state="{
            password,
        }"
        class="flex flex-col gap-[24px]"
        @submit="$emit('submit', { password })"
    >
        <div class="flex flex-col gap-[24px]">
            <UFormGroup name="password">
                <UInput
                    v-model="password"
                    input-class="input"
                    placeholder="Password"
                    type="password"
                    variant="outline"
                />
            </UFormGroup>
        </div>
        <div class="flex flex-col gap-[20px]">
            <UButton
                class="h-[48px] px-[16px] flex justify-between dark:hover:bg-dark-gray dark:hover:text-fa-white bg-yellow hover:text-fa-white hover:bg-dark-gray"
                trailing
                type="submit"
            >
                <span>{{
                    locale[settingsDataStore.locale].resetPassword
                }}</span>
                <UIcon class="text-[20px]" dynamic name="i-mdi-arrow-right" />
            </UButton>
        </div>
    </UForm>
</template>
