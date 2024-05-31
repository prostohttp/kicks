<script lang="ts" setup>
import { eng } from "~/lang/eng";
import { schema, type Schema } from "./schema/add-new-brand.schema";
import type { FormSubmitEvent } from "#ui/types";

// define
const emit = defineEmits(["close"]);

// store
const brandStore = useBrandDataStore();

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
const uploadImage = async (id: string, image: File) => {
  isLoading.value = true;
  try {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    await $fetch("/api/brand/photo", {
      method: "POST",
      body: formData,
    });
    await brandStore.getAllBrands(page);

    toast.add({ title: "Image uploaded", color: "green" });
    isLoading.value = false;
  } catch (_error) {
    toast.add({ title: "File upload error, must be an image", color: "red" });
  }
};

const onDrop = (files: File[] | null) => {
  if (files) {
    uploadImage("hello", files[0]);
  }
};

useDropZone(dropZoneRef, { onDrop });

const inputHandler = (e: Event) => {
  let fileInput = e.target as HTMLInputElement;
  uploadImage("hello", fileInput.files![0]);
};

const onSubmitHandler = async (event: FormSubmitEvent<Schema>) => {
  try {
    const formData = new FormData();
    formData.append("title", event.data.title);
    if (event.data.description) {
      formData.append("description", event.data.description);
    }
    await $fetch("/api/brand/add", {
      method: "POST",
      body: formData,
    });
    toast.add({ title: eng.successAddMessage });
    emit("close");
  } catch (_error) {
    toast.add({ title: eng.somethingWentWrong });
  }
};

const onSubmit = useThrottleFn(onSubmitHandler, 3000);

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
    <input type="file" ref="inputRef" class="hidden" />
    <div
      class="w-full h-full flex items-center justify-center flex-col text-center gap-[20px] bg-fa-white py-[40px] dark:bg-dark-gray rounded-[8px]"
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
        v-model="state.description"
        inputClass="input-label"
        icon="i-heroicons-document-text-16-solid"
      />
    </UFormGroup>
    <div
      class="flex sm:gap-[20px] pt-[20px] justify-end sm:flex-row flex-col gap-[10px]"
    >
      <UButton
        class="bg-dark-gray dark:bg-grey dark:text-dark-gray dark:hover:bg-grey dark:hover:text-dark-gray hover:bg-dark-bg uppercase h-[52px] px-[30px] flex sm:w-auto w-full text-center justify-center"
        @click="$emit('close')"
      >
        {{ eng.cancel }}
      </UButton>
      <UButton
        type="submit"
        class="red-button uppercase dark:bg-danger dark:text-fa-white dark:hover:bg-danger dark:hover:text-fa-white h-[52px] px-[30px] flex sm:w-auto w-full text-center justify-center"
      >
        {{ eng.save }}
      </UButton>
    </div>
  </UForm>
</template>
