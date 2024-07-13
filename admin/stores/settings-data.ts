import { defineStore } from "pinia";

export const useSettingsDataStore = defineStore(
  "settingsData",
  () => {
    return {};
  },
  {
    persist: true,
  },
);
