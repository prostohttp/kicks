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
        :schema="v.safeParser(schema)"
        :state="{
            name,
            email,
            password,
            terms,
            keepLogged,
        }"
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
    >
        <div class="flex flex-col gap-[20px]">
            <h1 class="font-[Rubik] font-[600] text-[24px]">
                {{ locale[settingsDataStore.locale].yourName }}
            </h1>
            <UFormGroup name="name">
                <UInput
                    v-model="name"
                    :placeholder="locale[settingsDataStore.locale].userName"
                    input-class="input"
                    variant="outline"
                />
            </UFormGroup>
        </div>
        <div class="flex flex-col gap-[20px]">
            <h1 class="font-[Rubik] font-[600] text-[24px]">
                {{ locale[settingsDataStore.locale].loginDetails }}
            </h1>
            <UFormGroup name="email">
                <UInput
                    v-model="email"
                    :placeholder="locale[settingsDataStore.locale].email"
                    input-class="input"
                    variant="outline"
                />
            </UFormGroup>
            <div class="flex flex-col gap-[5px]">
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
        </div>
        <div class="flex flex-col gap-[20px]">
            <UFormGroup name="terms">
                <UCheckbox v-model="terms">
                    <template #label>
                        <span class="open-sans text-[16px] font-[600]">
                            {{ locale[settingsDataStore.locale].agreeText }}
                            <small
                                class="text-[16px] underline decoration-gray-main hover: cursor-pointer"
                                @click.prevent="isOpen = true"
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
                class="h-[48px] px-[16px] flex justify-between dark:hover:bg-dark-gray dark:hover:text-fa-white dark:bg-yellow"
                trailing
                type="submit"
            >
                <span>{{ locale[settingsDataStore.locale].register }}</span>
                <UIcon class="text-[20px]" dynamic name="i-mdi-arrow-right" />
            </UButton>
            <UButton
                class="inverse h-[48px] px-[16px] flex justify-between w-full dark:hover:bg-dark-gray dark:hover:text-fa-white dark:bg-yellow uppercase font-[Rubik] bg-yellow hover:text-fa-white hover:bg-dark-gray"
                to="/auth/login"
                trailing
            >
                <span>{{ locale[settingsDataStore.locale].loginPage }}</span>
                <UIcon class="text-[20px]" dynamic name="i-mdi-arrow-right" />
            </UButton>
        </div>
    </UForm>
    <UiModal
        v-model="isOpen"
        class="dark:text-white"
        fullscreen
        title="KicksClub Terms & Conditions"
    >
        <ContentDoc path="/terms" />
    </UiModal>
</template>
