<script lang="ts" setup>
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";
import { SettingsLocale } from "~/types/ui/ui.types";
import { SettingsCurrency } from "~/types/ui/ui.types";

// store
const settingsDataStore = useSettingsDataStore();
const { settings } = storeToRefs(settingsDataStore);

// vars
const dropZoneRef = ref<HTMLInputElement | undefined>();
const toast = useToast();
const localeOptions = [
  {
    label: locale.en.russian,
    value: SettingsLocale.ru,
  },
  {
    label: locale.en.english,
    value: SettingsLocale.en,
  },
];

const currencyOptions = [
  {
    label: locale.en.rub,
    value: SettingsCurrency.rub,
  },
  {
    label: locale.en.usd,
    value: SettingsCurrency.usd,
  },
];

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
  await $fetch("/api/settings/edit", {
    method: "PUT",
    body: {
      image: uploadedImage,
    },
  });
  settings.value!.image = uploadedImage;
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
    await $fetch("/api/image/remove", {
      method: "DELETE",
      body: {
        image: settings.value!.image,
      },
    });
    settings.value!.image = "";
    await $fetch("/api/settings/edit", {
      method: "PUT",
      body: {
        image: "",
      },
    });
    toast.add({
      title: locale[settingsDataStore.locale].imageDeleted,
      color: "green",
    });
  } catch (error: any) {
    toast.add({
      title: error.message,
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
        <USelectMenu
          v-model="settings!.localeDashboard!"
          :options="localeOptions"
          selectClass="select-label-without-icon"
        />
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
        <USelectMenu
          v-model="settings!.localeStore"
          :options="localeOptions"
          selectClass="select-label-without-icon"
        />
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
        <USelectMenu
          v-model="settings!.mainCurrency"
          :options="currencyOptions"
          selectClass="select-label-without-icon"
        />
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
          inputClass="input-label-without-icon"
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
        <USelectMenu
          v-model="settings!.currency"
          :options="currencyOptions"
          selectClass="select-label-without-icon"
        />
      </UFormGroup>
    </div>
    <div class="lg:w-[32%] w-full flex flex-col gap-[20px] lg:mb-0 mb-[20px]">
      <UFormGroup
        :label="locale[settingsDataStore.locale].logo"
        name="image"
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
          :classForDarkMode="'dark:invert-[1] dark:invert-1'"
        />
      </UFormGroup>
    </div>
  </div>
  <pre>{{ settings }}</pre>
</template>
