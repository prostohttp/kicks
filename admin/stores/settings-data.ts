import { defineStore } from "pinia";
import type { SettingsDto } from "~/server/api/settings/dto/settings.dto";

export const useSettingsDataStore = defineStore("settingsData", () => {
  // vars
  const settings: Ref<SettingsDto | undefined> = ref();

  // handlers
  const getSettings = async () => {
    try {
      settings.value = await $fetch<SettingsDto>("/api/settings/all", {
        method: "GET",
      });
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
  };

  const setSettings = async (data: SettingsDto) => {
    try {
      settings.value = await $fetch<SettingsDto>("/api/settings/edit", {
        method: "PUT",
        body: {
          body: data,
        },
      });
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
  };
  return {
    settings,
    getSettings,
    setSettings,
  };
});
