<script lang="ts" setup>
import { locale } from "~/lang/locale";
import { SettingsLocale } from "~/types/ui/ui.types";
import type { LanguageLocale } from "~/types/server/server.types";
// define
const { lang } = defineProps<{
    lang: LanguageLocale;
}>();

// store
const settingsDataStore = useSettingsDataStore();
const { settings, locale: settingsLocale } = storeToRefs(settingsDataStore);
</script>

<template>
    <div class="w-full flex flex-col gap-[20px] mt-[40px]">
        <UFormGroup
            :label="locale[settingsLocale].title"
            :name="`${lang}.title`"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
        >
            <UInput
                v-model="settings![lang].title"
                inputClass="input-label-without-icon"
            />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsLocale].description"
            :name="`${lang}.description`"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
        >
            <UTextarea v-model="settings![lang].description" class="textarea" />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsLocale].email"
            :name="`${lang}.email`"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
        >
            <UInput
                v-model="settings![lang].email"
                inputClass="input-label-without-icon"
            />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsLocale].address"
            :name="`${lang}.address`"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
        >
            <UInput
                v-model="settings![lang].address"
                inputClass="input-label-without-icon"
            />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsLocale].phone"
            :name="`${lang}.phone`"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
        >
            <UInput
                v-model="settings![lang].phone"
                inputClass="input-label-without-icon"
            />
        </UFormGroup>
        <!-- <pre>{{ settings![lang] }}</pre> -->
    </div>
</template>
