import { defineStore } from "pinia";
import type { SettingsDto } from "~/server/api/settings/dto/settings.dto";

export const useSettingsDataStore = defineStore("settingsData", () => {
  // vars
  const settings: Ref<SettingsDto | undefined> = ref();
  const locale: Ref<"en" | "ru"> = ref("en");
  const currency: Ref<"usd" | "rub"> = ref("usd");

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
      locale.value = await $fetch<"en" | "ru">("/api/settings/all", {
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
      currency.value = await $fetch<"usd" | "rub">("/api/settings/all", {
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
