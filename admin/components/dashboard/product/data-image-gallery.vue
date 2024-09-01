<script lang="ts" setup>
import type { ModelRef } from "vue";
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";
import type { ProductDto } from "~/pages/dashboard/products/product.dto";
// define
const state: ModelRef<ProductDto> = defineModel("state", {
  required: true,
  default: {} as ProductDto,
});

// store
const settingsDataStore = useSettingsDataStore();

// vars
const toast = useToast();

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
    if (fileInput.files?.length) {
      for (let i = 0; i < fileInput.files?.length; i++) {
        const formData = new FormData();
        formData.append("folderName", Constants.IMG_PRODUCTS);
        formData.append("image", fileInput.files[i]);
        const uploadedImage = await uploadImageHandler(formData);
        state.value.additionImages?.push(uploadedImage);
      }
    }
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

const deleteImageHandler = async (index: number) => {
  try {
    await $fetch("/api/image/remove", {
      method: "DELETE",
      body: {
        image: state.value.additionImages![index],
      },
    });
    state.value.additionImages?.splice(index, 1);
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
  <UiImageUploadGallery
    v-model:images="state.additionImages"
    @delete="deleteImageHandler"
    @change="uploadImage($event)"
  />
</template>
