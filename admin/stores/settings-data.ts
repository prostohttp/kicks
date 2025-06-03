import { defineStore } from "pinia";
import type { SettingsDto } from "~/server/api/settings/dto/settings.dto";
import { SettingsCurrency, SettingsLocale } from "~/types/ui/ui.types";
import type {
    CurrencyLocale,
    LanguageLocale,
} from "~/types/server/server.types";

export const useSettingsDataStore = defineStore("settingsData", () => {
    // vars
    const settings: Ref<SettingsDto | undefined> = ref();
    const locale: Ref<LanguageLocale> = ref(SettingsLocale.en);
    const currency: Ref<CurrencyLocale> = ref(SettingsCurrency.usd);

    // handlers
    const getSettings = async () => {
        try {
            settings.value = await $fetch<SettingsDto>("/api/settings/all", {
                method: "GET",
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
        return true;
    };

    const setSettings = async (data: Omit<SettingsDto, "_id">) => {
        try {
            settings.value = await $fetch<SettingsDto>("/api/settings/edit", {
                method: "PUT",
                body: data,
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
    };

    const getLocale = async () => {
        try {
            locale.value = await $fetch<LanguageLocale>("/api/settings/all", {
                method: "GET",
                query: {
                    locale: true,
                },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
        return true;
    };

    const getCurrency = async () => {
        try {
            currency.value = await $fetch<
                SettingsCurrency.rub | SettingsCurrency.usd
            >("/api/settings/all", {
                method: "GET",
                query: {
                    currency: true,
                },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
        return true;
    };

    return {
        settings,
        locale,
        currency,
        getSettings,
        setSettings,
        getLocale,
        getCurrency,
    };
});
