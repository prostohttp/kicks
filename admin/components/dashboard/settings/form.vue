<script lang="ts" setup>
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";

// define

// store
const settingsDataStore = useSettingsDataStore();
const { settings } = storeToRefs(settingsDataStore);

// vars
const dropZoneRef = ref<HTMLInputElement | undefined>();
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
};

const uploadImage = async (e: Event) => {
  try {
    let fileInput = e.target as HTMLInputElement;
    const formData = new FormData();
    if (fileInput.files![0]) {
      formData.append("folderName", Constants.IMG_PUBLIC);
      formData.append("image", fileInput.files![0]);
    }
    await uploadImageHandler(formData);
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
        formData.append("folderName", Constants.IMG_PUBLIC);
        formData.append("image", files![0]);
      }
      await uploadImageHandler(formData);
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
  <div class="flex lg:flex-row flex-col-reverse justify-between mt-[40px]">
    <div class="lg:w-[65%] w-full flex flex-col gap-[20px]">
      <UFormGroup
        :label="locale[settingsDataStore.locale].localeDashboard"
        name="localeDashboard"
        :ui="{
          label: {
            base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
          },
        }"
      >
        <UInput v-model="settings!.localeDashboard" inputClass="input-label" />
      </UFormGroup>
      <UFormGroup
        :label="locale[settingsDataStore.locale].localeStore"
        name="localeStore"
        :ui="{
          label: {
            base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
          },
        }"
      >
        <UInput v-model="settings!.localeStore" inputClass="input-label" />
      </UFormGroup>
      <UFormGroup
        :label="locale[settingsDataStore.locale].mainCurrency"
        name="mainCurrency"
        :ui="{
          label: {
            base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
          },
        }"
      >
        <UInput v-model="settings!.mainCurrency" inputClass="input-label" />
      </UFormGroup>
      <UFormGroup
        :label="locale[settingsDataStore.locale].secondCurrencyRate"
        name="secondCurrencyRate"
        :ui="{
          label: {
            base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
          },
        }"
      >
        <UInput
          type="number"
          v-model="settings!.secondCurrencyRate"
          inputClass="input-label"
        />
      </UFormGroup>
      <UFormGroup
        :label="locale[settingsDataStore.locale].currency"
        name="currency"
        :ui="{
          label: {
            base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
          },
        }"
      >
        <UInput v-model="settings!.currency" inputClass="input-label" />
      </UFormGroup>
    </div>
    <div class="lg:w-[32%] w-full flex flex-col gap-[20px] lg:mb-0 mb-[20px]">
      <UFormGroup
        :label="locale[settingsDataStore.locale].logo"
        name="logo"
        :ui="{
          label: {
            base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
          },
        }"
      >
        <UiImageUpload
          v-model:image="settings"
          alt="logo"
          v-model:drop-zone-ref="dropZoneRef"
          @delete="deleteImageHandler"
          @change="uploadImage($event)"
        />
      </UFormGroup>
    </div>
  </div>
  <!-- <pre>{{ settings }}</pre> -->
</template>
