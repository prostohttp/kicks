<script lang="ts" setup>
import { eng } from "~/lang/eng";
import { schema, type Schema } from "./schema/add-new-brand.schema";
import type { FormSubmitEvent } from "#ui/types";
import { Constants } from "~/constants";
import * as v from "valibot";

// define
const { brandId } = defineProps<{
  brandId: string;
}>();
const emit = defineEmits(["close"]);

// store
const brandDataStore = useBrandDataStore();
await useAsyncData("brand", () => brandDataStore.getBrandById(brandId));
const { brand } = storeToRefs(brandDataStore);

// vars
const isAdmin = useIsAdmin();
const toast = useToast();
const isLoading = ref(false);
const isOpenDeleteModal = ref(false);
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
    await $fetch("/api/brand/edit", {
      method: "PUT",
      body: {
        _id: brand.value?._id,
        image: uploadedImage,
      },
    });
    brandDataStore.getBrandById(brandId);
    brandDataStore.getAllBrands(page);
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
    await $fetch("/api/brand/edit", {
      method: "PUT",
      body: {
        _id: brand.value?._id,
        title: event.data.title,
        description: event.data.description,
        image: brand.value?.image || "",
      },
    });
    brandDataStore.getBrandById(brandId);
    brandDataStore.getAllBrands(page);
    emit("close");
    toast.add({ title: eng.successEdit });
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
        image: brand.value?.image,
      },
    });
    await $fetch("/api/brand/edit", {
      method: "PUT",
      body: {
        _id: brand.value?._id,
        image: "",
      },
    });
    brandDataStore.getBrandById(brandId);
    brandDataStore.getAllBrands(page);

    inputRef.value!.value = "";
    toast.add({ title: eng.imageDeleted, color: "green" });
  } catch (_error) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
  }
};

const deleteBrandHandler = async () => {
  try {
    if (brand.value?.image) {
      await $fetch("/api/image/remove", {
        method: "DELETE",
        body: {
          image: brand.value.image,
        },
      });
    }
    await $fetch("/api/brand/remove", {
      method: "DELETE",
      body: {
        id: brand.value?._id,
      },
    });
    brandDataStore.getAllBrands(page);
    emit("close");
    toast.add({ title: eng.successDeleteMessage, color: "red" });
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

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));
</script>

<template>
  <UiEmpty v-if="!brand" />
  <UForm
    :schema="v.safeParser(schema)"
    :state="brand"
    class="space-y-4"
    @submit="protectedSubmitHandler"
    v-else
  >
    <div
      class="rounded-[8px] basis-[40%] px-[20px] py-[40px] bg-fa-white flex items-center justify-center relative group mb-[40px]"
      v-if="isAdmin"
    >
      <UiImageUpload
        v-model:image="brand"
        v-model:isLoading="isLoading"
        :alt="brand?.title"
        v-model:input-ref="inputRef"
        v-model:drop-zone-ref="dropZoneRef"
        @delete="deleteImageHandler"
      />
    </div>
    <div
      class="rounded-[8px] basis-[40%] px-[20px] py-[40px] bg-fa-white dark:bg-opacity-90 flex items-center justify-center relative group mb-[40px]"
      v-else-if="!isAdmin && brand?.image"
    >
      <div class="w-full">
        <img
          :src="`/${brand.image}`"
          class="w-full rounded-[8px] dark:brightness-0 dark:invert-[0.5]"
          alt="new brand"
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
        v-model="brand.title"
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
        v-model="brand.description"
        :placeholder="eng.description"
        class="textarea"
      />
    </UFormGroup>
    <div
      class="flex sm:gap-[20px] pt-[20px] justify-end sm:flex-row flex-col gap-[10px]"
      v-if="isAdmin"
    >
      <UTooltip
        :text="eng.delete"
        class="mr-auto"
        :popper="{ placement: 'top' }"
      >
        <UButton
          class="bg-danger hover:bg-danger uppercase dark:bg-danger dark:text-fa-white dark:hover:bg-danger dark:hover:text-fa-white flex sm:w-auto w-full text-center justify-center"
          icon="i-heroicons-trash"
          @click="isOpenDeleteModal = true"
        >
        </UButton>
      </UTooltip>
      <DashboardBrandDeleteModal
        v-model="isOpenDeleteModal"
        @delete="deleteBrandHandler"
      />
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
