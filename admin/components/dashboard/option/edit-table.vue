<script lang="ts" setup>
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";
import type { UiOptionDto } from "~/types/server/server.types";

// emits
const { optionId } = defineProps<{
  optionId: string;
}>();

// store
const optionDataStore = useOptionDataStore();
const { option } = storeToRefs(optionDataStore);

// vars
const isAdmin = useIsAdmin();
const toast = useToast();
const columns = [
  {
    key: "value",
    label: locale[useSettingsDataStore().locale].value,
  },
  {
    key: "image",
    label: locale[useSettingsDataStore().locale].image,
  },
  {
    key: "sort",
    label: locale[useSettingsDataStore().locale].sort,
  },
  {
    key: "action",
  },
];

// handlers
const setOptionImageHandler = (
  option: UiOptionDto,
  id: number,
  image: string,
) => {
  return option.values.map((option) => {
    if (option.id === id) {
      return {
        ...option,
        image: image,
      };
    } else {
      return option;
    }
  });
};

const uploadImage = async (e: Event, id: number) => {
  try {
    let fileInput = e.target as HTMLInputElement;
    const formData = new FormData();
    if (fileInput.files![0]) {
      formData.append("folderName", Constants.IMG_OPTIONS);
      formData.append("image", fileInput.files![0]);
    }
    const uploadedImage = await $fetch("/api/image/add", {
      method: "POST",
      body: formData,
    });

    if (!uploadedImage) {
      toast.add({
        title: locale[useSettingsDataStore().locale].notImage,
        color: "red",
      });
    }
    changeValueFromArray(id, option.value.values, "image", uploadedImage);

    await $fetch("/api/option/edit", {
      method: "PUT",
      body: {
        _id: optionId,
        values: setOptionImageHandler(option.value!, id, uploadedImage),
      },
    });
    toast.add({
      title: locale[useSettingsDataStore().locale].imageUploaded,
      color: "green",
    });
  } catch (error: any) {
    toast.add({ title: error.message, color: "red" });
  }
};

const deleteImageHandler = async (id: number) => {
  try {
    await $fetch("/api/image/remove", {
      method: "DELETE",
      body: {
        image: option.value.values.filter((value) => value.id === id)[0].image,
      },
    });

    await $fetch("/api/option/edit", {
      method: "PUT",
      body: {
        _id: optionId,
        values: setOptionImageHandler(option.value, id, ""),
      },
    });
    changeValueFromArray(id, option.value.values, "image", "");
    toast.add({
      title: locale[useSettingsDataStore().locale].imageDeleted,
      color: "green",
    });
  } catch (error: any) {
    toast.add({ title: error.message, color: "red" });
  }
};

const deleteValue = (id: number) => {
  deleteValueFromArray(id, option.value.values);
};
</script>

<template>
  <UTable
    :rows="option.values"
    :columns="columns"
    :empty-state="{
      icon: '',
      label: '',
    }"
    :ui="{
      td: {
        base: 'md:whitespace-pre-wrap md:break-all whitespace-normal break-normal for-absolute',
      },
      emptyState: {
        wrapper: 'hidden',
      },
    }"
  >
    <template #caption>
      <caption
        class="pb-[15px] w-full justify-between items-center text-left text-[20px] dark:text-fa-white font-[Rubik] font-[500] relative mt-[20px]"
      >
        <span>
          {{ locale[useSettingsDataStore().locale].addValue }}
        </span>
      </caption>
    </template>
    <template #value-data="{ row }">
      <UFormGroup :name="`value${row.id}`">
        <UInput
          :placeholder="locale[useSettingsDataStore().locale].addValue"
          inputClass="clean-field"
          v-model="row.value"
        />
      </UFormGroup>
    </template>
    <template #image-data="{ row }">
      <UiImageUploadSmall
        v-model="row.image"
        @change="uploadImage($event, row.id)"
        @delete="deleteImageHandler(row.id)"
      />
    </template>
    <template #sort-data="{ row }">
      <UFormGroup :name="`sort${row.id}`">
        <UInput
          :placeholder="locale[useSettingsDataStore().locale].sort"
          inputClass="clean-field"
          v-model="row.sort"
          type="number"
          min="1"
        />
      </UFormGroup>
    </template>
    <template #action-data="{ row }">
      <UButton
        class="icon-button float-right"
        icon="i-heroicons-minus-circle-16-solid"
        @click="deleteValue(row.id)"
      />
    </template>
  </UTable>
  <UButton
    type="button"
    class="icon-button float-right mr-[15px]"
    icon="i-heroicons-plus-circle-16-solid"
    @click="optionDataStore.addNewValue"
  />
</template>
