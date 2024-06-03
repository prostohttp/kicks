<script lang="ts" setup>
import { eng } from "~/lang/eng";
import { schema, type Schema } from "./schema/add-new-brand.schema";
import type { FormSubmitEvent } from "#ui/types";
import { usePersistDataStore } from "~/stores/persist-data";
import { Constants } from "~/constants";

// define
const emit = defineEmits(["close"]);

// store
const brandStore = useBrandDataStore();
const persistStore = usePersistDataStore();
const { brandImage } = storeToRefs(persistStore);

// vars
const toast = useToast();
const state = reactive({
  title: "",
  description: "",
});
const isLoading = ref(false);
const page = useRoute().query.page as never as number;
const inputRef: Ref<HTMLInputElement | undefined> = ref();
const dropZoneRef = ref<HTMLDivElement | undefined>();

// handlers
const uploadImage = async (image: File) => {
  isLoading.value = true;
  try {
    const formData = new FormData();
    formData.append("folderName", Constants.IMG_BRANDS);
    if (image) {
      formData.append("image", image);
    }
    const uploadedImage = await $fetch("/api/image/add", {
      method: "POST",
      body: formData,
    });
    if (!uploadedImage) {
      toast.add({ title: eng.noImage, color: "red" });
    }
    brandImage.value = uploadedImage;
    toast.add({ title: eng.imageUploaded, color: "green" });
    isLoading.value = false;
  } catch (_error) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
  }
};

const onDrop = (files: File[] | null) => {
  if (files) {
    uploadImage(files[0]);
  }
};

useDropZone(dropZoneRef, { onDrop });

const inputHandler = (e: Event) => {
  let fileInput = e.target as HTMLInputElement;
  uploadImage(fileInput.files![0]);
};

const onSubmitHandler = async (event: FormSubmitEvent<Schema>) => {
  try {
    await $fetch("/api/brand/add", {
      method: "POST",
      body: {
        title: event.data.title,
        description: event.data.description,
        image: brandImage.value || "",
      },
    });
    brandStore.getAllBrands(page);
    toast.add({ title: eng.successAddMessage });
    emit("close");
    brandImage.value = "";
  } catch (_error) {
    toast.add({ title: eng.somethingWentWrong });
  }
};

const onSubmit = useThrottleFn(onSubmitHandler, 3000);

const deleteImageHandler = async () => {
  try {
    await $fetch("/api/image/remove", {
      method: "DELETE",
      body: {
        image: brandImage.value,
      },
    });
    brandImage.value = "";
    inputRef.value!.value = "";
    toast.add({ title: eng.imageDeleted, color: "green" });
  } catch (_error) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
  }
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
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <div
      class="rounded-[8px] basis-[40%] px-[20px] py-[40px] bg-fa-white dark:bg-[#2c2c2c] flex items-center justify-center relative group mb-[40px]"
    >
      <input type="file" ref="inputRef" class="hidden" />
      <div
        v-if="!brandImage"
        class="w-full h-full flex items-center justify-center flex-col text-center gap-[20px]"
        ref="dropZoneRef"
      >
        <img
          src="~/public/no-image.svg"
          alt="No Image"
          class="lg:w-[100px] w-[40px]"
        />
        <div
          class="flex flex-col gap-[10px] text-[14px] items-center dark:text-fa-white"
        >
          <h3>{{ eng.dragDropMessage }}</h3>
          <UDivider
            :label="eng.or"
            :ui="{
              border: {
                base: 'dark:border-[#70706e]',
              },
              label: 'text-[12px]',
            }"
          />
          <button
            type="button"
            @click="inputRef?.click()"
            class="hover:bg-grey py-[2px] px-[10px] rounded-[8px] dark:hover:bg-gray-main"
          >
            {{ eng.clickToUpload }}
          </button>
        </div>
      </div>
      <div v-else class="w-full">
        <img
          :src="`/${brandImage}`"
          class="w-full rounded-[8px] group-hover:opacity-70 transition-opacity"
          alt="new brand"
        />
        <UButton
          icon="i-heroicons-trash"
          @click="deleteImageHandler"
          class="absolute top-1/2 left-1/2 dark:hover:bg-yellow dark:bg-yellow h-[50px] w-[50px] flex items-center justify-center -translate-x-[50%] -translate-y-[50%] bg-blue hover:bg-blue opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </div>
    <UFormGroup
      :label="eng.title"
      name="title"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <UInput
        :placeholder="eng.title"
        v-model="state.title"
        inputClass="input-label"
        icon="i-heroicons-queue-list"
      />
    </UFormGroup>

    <UFormGroup
      :label="eng.description"
      name="description"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <UInput
        :placeholder="eng.description"
        v-model="state.description"
        inputClass="input-label"
        icon="i-heroicons-document-text-16-solid"
      />
    </UFormGroup>
    <div
      class="flex sm:gap-[20px] pt-[20px] justify-end sm:flex-row flex-col gap-[10px]"
    >
      <UButton
        class="bg-dark-gray dark:bg-grey dark:text-dark-gray dark:hover:bg-grey dark:hover:text-dark-gray hover:bg-dark-bg uppercase px-[30px] flex sm:w-auto w-full text-center justify-center"
        @click="$emit('close')"
      >
        {{ eng.cancel }}
      </UButton>
      <UButton
        type="submit"
        class="red-button uppercase dark:bg-danger dark:text-fa-white dark:hover:bg-danger dark:hover:text-fa-white px-[30px] flex sm:w-auto w-full text-center justify-center"
      >
        {{ eng.save }}
      </UButton>
    </div>
  </UForm>
</template>
