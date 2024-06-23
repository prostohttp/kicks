<script lang="ts" setup>
import type { ModelRef } from "vue";
import { Constants } from "~/constants";
import { eng } from "~/lang/eng";

// emits
const options: ModelRef<{ [key: string]: any }[] | undefined> = defineModel();

// store
const optionDataStore = useOptionDataStore();
const { state } = storeToRefs(optionDataStore);
const { optionImages } = storeToRefs(optionDataStore);

// vars
const toast = useToast();
const inputRef: Ref<HTMLInputElement | undefined> = ref();
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
const activeId = ref();

// handlers
const uploadImage = async (image: File) => {
  try {
    const formData = new FormData();
    formData.append("folderName", Constants.IMG_OPTIONS);
    if (image) {
      formData.append("image", image);
    }
    const uploadedImage = await $fetch("/api/image/add", {
      method: "POST",
      body: formData,
    });

    if (!uploadedImage) {
      toast.add({ title: eng.notImage, color: "red" });
    }
    optionImages.value[activeId.value] = { image: uploadedImage };
    state.value.values[activeId.value].image = uploadedImage;
    toast.add({ title: eng.imageUploaded, color: "green" });
  } catch (error: any) {
    toast.add({ title: error.message, color: "red" });
  }
};

const deleteImageHandler = async (id: string) => {
  try {
    await $fetch("/api/image/remove", {
      method: "DELETE",
      body: {
        image: optionImages.value[id].image,
      },
    });
    inputRef.value!.value = "";
    delete optionImages.value[id];
    state.value.values[id].image = "";
    toast.add({ title: eng.imageDeleted, color: "green" });
  } catch (error: any) {
    // toast.add({ title: eng.somethingWentWrong, color: "red" });
    toast.add({ title: error.message, color: "red" });
  }
};

const inputHandler = (e: Event) => {
  let fileInput = e.target as HTMLInputElement;
  uploadImage(fileInput.files![0]);
};

const addNewValue = () => {
  const id = Math.floor(Math.random() * 100000);
  state.value.values[id] = {
    value: "",
    sort: "",
    image: "",
  };
  options.value?.push({
    id,
    value: "value" + id,
    image: "image" + id,
    sort: "sort" + id,
    action: "delete",
  });
};

const deleteValue = (id: string) => {
  options.value = options.value?.filter((option) => option.id !== id);
  delete state.value.values[id];
  if (optionImages.value[id]) {
    deleteImageHandler(id);
  }
};

// hooks
watch(inputRef, () => {
  if (inputRef.value) {
    inputRef.value.addEventListener("change", inputHandler);
  }
});

onUnmounted(() => {
  if (inputRef.value) {
    inputRef.value.removeEventListener("change", inputHandler);
  }
});
</script>

<template>
  <UTable
    :rows="options"
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
      <UFormGroup :name="row.value" v-if="row.value">
        <UInput
          :placeholder="eng.value"
          inputClass="clean-field"
          v-model="state.values[row.id]['value']"
        />
      </UFormGroup>
    </template>
    <template #image-data="{ row }">
      <UiImageUploadSmall
        :add-new="true"
        :id="row.id"
        v-model:active-id="activeId"
        v-model:image="optionImages[row.id]"
        v-model:input-ref="inputRef"
        @delete="deleteImageHandler"
      />
    </template>
    <template #sort-data="{ row }">
      <UFormGroup :name="row.sort" v-if="row.sort">
        <UInput
          :placeholder="eng.sort"
          inputClass="clean-field"
          v-model="state.values[row.id]['sort']"
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
    @click="addNewValue"
  />
  <pre>{{ state }}</pre>
</template>
