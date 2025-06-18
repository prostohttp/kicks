<script lang="ts" setup>
import type { ModelRef } from "vue";
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";

// define
const activeTab: ModelRef<number | undefined> = defineModel("activeTab");
const { index } = defineProps<{
    index: number;
}>();
// vars
const toast = useToast();
const dropZoneRef = ref<HTMLInputElement | undefined>();

// store
const bannerDataStore = useBannerDataStore();
const settingsDataStore = useSettingsDataStore();
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
        await $fetch("/api/banner/edit", {
            method: "PUT",
            body: {
                _id: banner.value._id,
                banners: banner.value.banners,
            },
        });
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
            await $fetch("/api/banner/edit", {
                method: "PUT",
                body: {
                    _id: banner.value._id,
                    banners: banner.value.banners,
                },
            });
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
                image: banner.value.banners[activeTab.value!].image,
            },
        });
        banner.value.banners[activeTab.value!].image = "";
        await $fetch("/api/banner/edit", {
            method: "PUT",
            body: {
                _id: banner.value._id,
                banners: banner.value.banners,
            },
        });
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
</script>

<template>
    <div class="flex flex-col gap-[30px]">
        <UFormGroup :name="`image${banner.banners[index].id}`">
            <UiImageUpload
                v-model:drop-zone-ref="dropZoneRef"
                v-model:image="banner.banners[index]"
                :alt="locale[settingsDataStore.locale].newBanner"
                @change="uploadImage($event)"
                @delete="deleteImageHandler"
            />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsDataStore.locale].heading"
            :name="`heading${banner.banners[index].id}`"
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
            :name="`description${banner.banners[index].id}`"
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
            :name="`url${banner.banners[index].id}`"
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
            :name="`sort${banner.banners[index].id}`"
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
