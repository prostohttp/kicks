export const usePersistDataStore = defineStore(
  "persistData",
  () => {
    // vars
    const brandImage = ref("");
    const articleImage = ref("");
    const optionImages: Ref<{ title: string; image: string }[]> = ref([]);

    return {
      brandImage,
      articleImage,
      optionImages,
    };
  },
  { persist: true },
);
