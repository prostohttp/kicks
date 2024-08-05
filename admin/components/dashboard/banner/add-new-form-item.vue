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
      title: locale[useSettingsDataStore().locale].noImage,
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
      title: locale[useSettingsDataStore().locale].imageUploaded,
      color: "green",
    });
  } catch (_error) {
    toast.add({
      title: locale[useSettingsDataStore().locale].somethingWentWrong,
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
        title: locale[useSettingsDataStore().locale].imageUploaded,
        color: "green",
      });
    }
  } catch (error) {
    toast.add({
      title: locale[useSettingsDataStore().locale].somethingWentWrong,
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
      title: locale[useSettingsDataStore().locale].imageDeleted,
      color: "green",
    });
  } catch (_error) {
    toast.add({
      title: locale[useSettingsDataStore().locale].somethingWentWrong,
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
        v-model:image="banner.banners[activeTab!]"
        :alt="locale[useSettingsDataStore().locale].newBanner"
        v-model:drop-zone-ref="dropZoneRef"
        @delete="deleteImageHandler"
        @change="uploadImage($event)"
      />
    </UFormGroup>
    <UFormGroup
      :name="`heading${id}`"
      :label="locale[useSettingsDataStore().locale].heading"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[10px]',
        },
      }"
    >
      <UInput
        :placeholder="locale[useSettingsDataStore().locale].heading"
        inputClass="no-left-icon"
        v-model="banner.banners[index].heading"
      />
    </UFormGroup>
    <UFormGroup
      :name="`description${id}`"
      :label="locale[useSettingsDataStore().locale].description"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[10px]',
        },
      }"
    >
      <UTextarea
        :placeholder="locale[useSettingsDataStore().locale].description"
        inputClass="no-left-icon"
        class="textarea"
        v-model="banner.banners[index].description"
      />
    </UFormGroup>
    <UFormGroup
      :name="`url${id}`"
      :label="locale[useSettingsDataStore().locale].url"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[10px]',
        },
      }"
    >
      <UInput
        :placeholder="locale[useSettingsDataStore().locale].url"
        inputClass="no-left-icon"
        v-model="banner.banners[index].url"
      />
    </UFormGroup>
    <UFormGroup
      :name="`sort${id}`"
      :label="locale[useSettingsDataStore().locale].sort"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[10px]',
        },
      }"
    >
      <UInput
        :placeholder="locale[useSettingsDataStore().locale].sort"
        inputClass="no-left-icon"
        v-model="banner.banners[index].sort"
        type="number"
        min="1"
      />
    </UFormGroup>
    <!-- <pre>{{ banner.banners[index] }}</pre> -->
  </div>
</template>
