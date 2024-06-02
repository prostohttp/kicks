export const usePersistDataStore = defineStore(
  "persistData",
  () => {
    // vars
    const brandImage = ref("");

    return {
      brandImage,
    };
  },
  { persist: true },
);
