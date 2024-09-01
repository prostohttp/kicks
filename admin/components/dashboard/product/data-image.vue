<script lang="ts" setup>
import type { ModelRef } from "vue";
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";
import type { ProductDto } from "~/server/api/product/dto/product.dto";

// define
const state: ModelRef<ProductDto> = defineModel("state", {
  required: true,
  default: {} as ProductDto,
});

// store
const settingsDataStore = useSettingsDataStore();

// vars
const toast = useToast();
const dropZoneRef = ref<HTMLInputElement | undefined>();

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
      formData.append("folderName", Constants.IMG_PRODUCTS);
      formData.append("image", fileInput.files![0]);
    }
    const uploadedImage = await uploadImageHandler(formData);
    state.value.image = uploadedImage;
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
        formData.append("folderName", Constants.IMG_PRODUCTS);
        formData.append("image", files![0]);
      }
      const uploadedImage = await uploadImageHandler(formData);
      state.value.image = uploadedImage;
      toast.add({
        title: locale[settingsDataStore.locale].imageDeleted,
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
        image: state.value.image,
      },
    });
    state.value.image = "";
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
  <div>
    <UFormGroup
      :label="locale[settingsDataStore.locale].productPhoto"
      name="image"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <UiImageUpload
        v-model:image="state"
        alt="logo"
        v-model:drop-zone-ref="dropZoneRef"
        @delete="deleteImageHandler"
        @change="uploadImage($event)"
      />
    </UFormGroup>
  </div>
</template>
