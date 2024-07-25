<script lang="ts" setup>
import { Constants } from "~/constants";
import { eng } from "~/lang/eng";

// store
const optionDataStore = useOptionDataStore();
const { option } = storeToRefs(optionDataStore);

// vars
const toast = useToast();
const columns = [
  {
    key: "value",
    label: "Value",
  },
  {
    key: "image",
    label: "Image",
  },
  {
    key: "sort",
    label: "Sort",
  },
  {
    key: "action",
  },
];

// handlers
const uploadImage = async (e: Event, id: number) => {
  try {
    let fileInput = e.target as HTMLInputElement;
    const formData = new FormData();
    formData.append("folderName", Constants.IMG_OPTIONS);
    if (fileInput.files![0]) {
      formData.append("image", fileInput.files![0]);
    }
    const uploadedImage = await $fetch("/api/image/add", {
      method: "POST",
      body: formData,
    });

    if (!uploadedImage) {
      toast.add({ title: eng.notImage, color: "red" });
    }
    option.value.values[id].image = uploadedImage;
    toast.add({ title: eng.imageUploaded, color: "green" });
  } catch (error: any) {
    toast.add({ title: error.message, color: "red" });
  }
};

const deleteImageHandler = async (id: number) => {
  try {
    await $fetch("/api/image/remove", {
      method: "DELETE",
      body: {
        image: option.value.values![id].image,
      },
    });
    option.value.values[id].image = "";

    toast.add({ title: eng.imageDeleted, color: "green" });
  } catch (error: any) {
    toast.add({ title: error.message, color: "red" });
  }
};

const deleteValue = (id: number) => {
  if (option.value.values![id].image) {
    deleteImageHandler(id);
  }
  delete option.value.values![id];
};
</script>

<template>
  <UTable
    :rows="Object.values(option.values)"
    :columns="columns"
    :empty-state="{
      icon: '',
      label: '',
    }"
    :ui="{
      td: {
        base: 'md:whitespace-pre-wrap md:break-all whitespace-normal break-normal',
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
          {{ eng.addValue }}
        </span>
      </caption>
    </template>
    <template #value-data="{ row }">
      <UFormGroup>
        <UInput
          :placeholder="eng.error.stringMin"
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
      <UFormGroup>
        <UInput
          :placeholder="eng.error.numberMin"
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
        icon="i-heroicons-minus-circle-16-solid h-[20px] w-[20px]"
        @click="deleteValue(row.id)"
      />
    </template>
  </UTable>
  <UButton
    class="icon-button float-right mr-[15px]"
    icon="i-heroicons-plus-circle-16-solid h-[20px] w-[20px]"
    type="button"
    @click="optionDataStore.addNewValue"
  />
</template>
