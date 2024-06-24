export const usePersistDataStore = defineStore(
  "persistData",
  () => {
    // vars
    const brandImage = ref("");
    const articleImage = ref("");

    return {
      brandImage,
      articleImage,
    };
  },
  { persist: true },
);
