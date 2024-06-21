<script lang="ts" setup>
import { Constants } from "~/constants";
import { eng } from "~/lang/eng";

// emits
const options = defineModel("options");

// store
const optionDataStore = useOptionDataStore();
const persistDataStore = usePersistDataStore();
const { optionImages } = storeToRefs(persistDataStore);
const { selected } = storeToRefs(optionDataStore);

// vars
const isLoading = ref(false);
const toast = useToast();
const inputRef = ref<HTMLInputElement>();
const dropZoneRef = ref<HTMLDivElement | null>();
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
const uploadImage = async (image: File) => {
  isLoading.value = true;
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

    optionImages.value.push({ title: "tetel", image: uploadedImage });
    toast.add({ title: eng.imageUploaded, color: "green" });
    isLoading.value = false;
  } catch (_error) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
  }
};

const onDrop = async (files: File[] | null) => {
  if (files) {
    uploadImage(files[0]);
  }
};

useDropZone(dropZoneRef, { onDrop });
const deleteImageHandler = async () => {
  try {
    await $fetch("/api/image/remove", {
      method: "DELETE",
      body: {
        image: optionImages,
      },
    });
    optionImages.value.length = 0;
    inputRef.value!.value = "";
    toast.add({ title: eng.imageDeleted, color: "green" });
  } catch (_error) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
  }
};

const inputHandler = (e: Event) => {
  let fileInput = e.target as HTMLInputElement;
  uploadImage(fileInput.files![0]);
};

// hooks
onMounted(() => {
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
    v-model="selected"
    :rows="options"
    :columns="columns"
    :empty-state="{
      icon: '',
      label: '',
    }"
    :ui="{
      td: {
        base: 'md:whitespace-pre-wrap md:break-all whitespace-normal break-normal',
        color: 'text-dark-gray dark:text-fa-white',
      },
      default: {
        checkbox: {
          class: 'checkbox',
        },
      },
    }"
    class="text-dark-gray"
  >
    <template #caption>
      <caption
        class="pb-[15px] w-full justify-between items-center text-left text-[20px] dark:text-fa-white font-[Rubik] font-[500] relative"
      >
        <span>
          {{ eng.addValue }}
        </span>
      </caption>
    </template>
  </UTable>
</template>
