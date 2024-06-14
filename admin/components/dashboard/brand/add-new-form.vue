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
const isAdmin = useIsAdmin();
const toast = useToast();
const state = reactive({
  title: "",
  description: "",
});
const isLoading = ref(false);
const page = Number(useRoute().query.page);
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
  } catch (_error: any) {
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
      v-if="isAdmin"
    >
      <UiImageUpload
        v-model:image="brandImage"
        v-model:isLoading="isLoading"
        alt="Brand Image"
        :add-new="true"
        v-model:input-ref="inputRef"
        v-model:drop-zone-ref="dropZoneRef"
        @delete="deleteImageHandler"
      />
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
      <UTextarea
        v-model="state.description"
        :placeholder="eng.description"
        class="textarea"
      />
    </UFormGroup>
    {{ brandImage }}
    <div
      class="flex sm:gap-[20px] pt-[20px] justify-end sm:flex-row flex-col gap-[10px]"
      v-if="isAdmin"
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
