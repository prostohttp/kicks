<script lang="ts" setup>
import type { ModelRef } from "vue";
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";

// define
const { index, id } = defineProps<{
    index: number;
    id: number;
}>();
const activeTab: ModelRef<number | undefined> = defineModel("activeTab");
// vars
const toast = useToast();
const dropZoneRef = ref<HTMLInputElement | undefined>();

// store
const settingsDataStore = useSettingsDataStore();
const bannerDataStore = useBannerDataStore();
const { banner } = storeToRefs(bannerDataStore);

// handlers
const uploadImageHandler = async (formData: FormData) => {
    const uploadedImage = await $fetch("/api/image/add", {
        method: "POST",
        body: formData,
    });
    if (!uploadedImage) {
        toast.add({
            title: locale[settingsDataStore.locale].noImage,
            color: "red",
        });
    }
    return uploadedImage;
};

const uploadImage = async (e: Event) => {
    try {
        let fileInput = e.target as HTMLInputElement;
        const formData = new FormData();
        if (fileInput.files![0]) {
            formData.append("folderName", Constants.IMG_BANNERS);
            formData.append("image", fileInput.files![0]);
        }
        const uploadedImage = await uploadImageHandler(formData);
        banner.value.banners[activeTab.value!].image = uploadedImage;
        toast.add({
            title: locale[settingsDataStore.locale].imageUploaded,
            color: "green",
        });
    } catch (_error) {
        toast.add({
            title: locale[settingsDataStore.locale].somethingWentWrong,
            color: "red",
        });
    }
};

const onDrop = async (files: File[] | null) => {
    try {
        if (files) {
            const formData = new FormData();
            if (files![0]) {
                formData.append("image", files[0]);
                formData.append("folderName", Constants.IMG_BANNERS);
            }
            const uploadedImage = await uploadImageHandler(formData);
            banner.value.banners[activeTab.value!].image = uploadedImage;
            toast.add({
                title: locale[settingsDataStore.locale].imageUploaded,
                color: "green",
            });
        }
    } catch (error) {
        toast.add({
            title: locale[settingsDataStore.locale].somethingWentWrong,
            color: "red",
        });
    }
};

useDropZone(dropZoneRef, { onDrop });

const deleteImageHandler = async () => {
    try {
        await $fetch("/api/image/remove", {
            method: "DELETE",
            body: {
                image: banner.value.banners[index].image,
            },
        });
        banner.value.banners[activeTab.value!].image = "";
        toast.add({
            title: locale[settingsDataStore.locale].imageDeleted,
            color: "green",
        });
    } catch (_error) {
        toast.add({
            title: locale[settingsDataStore.locale].somethingWentWrong,
            color: "red",
        });
    }
};

// hooks
</script>

<template>
    <div class="flex flex-col gap-[30px]">
        <UFormGroup :name="`image${id}`">
            <UiImageUpload
                v-model:drop-zone-ref="dropZoneRef"
                v-model:image="banner.banners[activeTab!]"
                :alt="locale[settingsDataStore.locale].newBanner"
                @change="uploadImage($event)"
                @delete="deleteImageHandler"
            />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsDataStore.locale].heading"
            :name="`heading${id}`"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[10px]',
                },
            }"
        >
            <UInput
                v-model="banner.banners[index].heading"
                :placeholder="locale[settingsDataStore.locale].heading"
                inputClass="no-left-icon"
            />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsDataStore.locale].description"
            :name="`description${id}`"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[10px]',
                },
            }"
        >
            <UTextarea
                v-model="banner.banners[index].description"
                :placeholder="locale[settingsDataStore.locale].description"
                class="textarea"
                inputClass="no-left-icon"
            />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsDataStore.locale].url"
            :name="`url${id}`"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[10px]',
                },
            }"
        >
            <UInput
                v-model="banner.banners[index].url"
                :placeholder="locale[settingsDataStore.locale].url"
                inputClass="no-left-icon"
            />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsDataStore.locale].sort"
            :name="`sort${id}`"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[10px]',
                },
            }"
        >
            <UInput
                v-model="banner.banners[index].sort"
                :placeholder="locale[settingsDataStore.locale].sort"
                inputClass="no-left-icon"
                min="1"
                type="number"
            />
        </UFormGroup>
    </div>
</template>
