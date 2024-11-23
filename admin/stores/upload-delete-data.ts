import { defineStore } from "pinia";

export const useUploadDeleteDataStore = defineStore("UploadDeleteData", () => {
    // handlers
    const uploadHandler = async (formData: FormData) => {
        return await $fetch("/api/image/add", {
            method: "POST",
            body: formData,
        });
    };

    const deleteHandler = async (image: string) => {
        await $fetch("/api/image/remove", {
            method: "DELETE",
            body: {
                image,
            },
        });
    };
    return { uploadHandler, deleteHandler };
});
