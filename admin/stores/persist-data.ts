export const usePersistDataStore = defineStore(
    "persistData",
    () => {
        // vars
        const brandImage = ref("");
        const articleImage = ref("");

        // handlers

        return {
            brandImage,
            articleImage,
        };
    },
    { persist: true },
);
