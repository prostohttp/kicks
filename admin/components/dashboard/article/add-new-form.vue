<script lang="ts" setup>
import { schema, type Schema } from "./schema/article-schema.js";
import type { FormSubmitEvent } from "#ui/types";
import { eng } from "~/lang/eng";
import { useProductDataStore } from "~/stores/product-data";
import { usePersistDataStore } from "~/stores/persist-data.js";
import { Locales, type InputData } from "~/types/ui/ui.types";
import { Constants } from "~/constants";

// define
defineProps<{ articleData: InputData[] }>();

// Store
const persistDataStore = usePersistDataStore();
const productDataStore = useProductDataStore();
const { titles } = storeToRefs(productDataStore);
const { articleImage } = storeToRefs(persistDataStore);

// Vars
await productDataStore.getTitles();
const isLoading = ref(false);
const isAdmin = useIsAdmin();
const toast = useToast();
const inputRef = ref<HTMLInputElement>();
const dropZoneRef = ref<HTMLDivElement | null>();

const state = reactive({
  title: "",
  shortDescription: "",
  description: "",
  featuredProducts: [],
  adminMenu: false,
  siteMenu: false,
  isEnabled: true,
  sort: "",
});

// Handlers
const reloadState = () => {
  state.title = "";
  state.shortDescription = "";
  state.description = "";
  state.featuredProducts = [];
  state.adminMenu = false;
  state.isEnabled = false;
  state.siteMenu = false;
  state.sort = "";
};

const uploadImage = async (image: File) => {
  isLoading.value = true;
  try {
    const formData = new FormData();
    formData.append("folderName", Constants.IMG_ARTICLES);
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

    articleImage.value = uploadedImage;
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

const onSubmitHandler = async (event: FormSubmitEvent<Schema>) => {
  try {
    // await $fetch("/api/article/add", {
    //   method: "POST",
    //   body: {
    //     title: event.data.title,
    //     shortDescription: event.data.shortDescription,
    //     description: event.data.description,
    //     isEnabled: event.data.isEnabled,
    //     adminMenu: event.data.adminMenu,
    //     siteMenu: event.data.siteMenu,
    //     image: articleImage.value || "",
    //     sort: event.data.sort,
    //     featuredProducts: event.data.featuredProducts,
    //     createdAt: dateTimeFormat(new Date().toDateString(), Locales.RU),
    //   },
    // });
    // articleImage.value = "";

    const test = {
      title: event.data.title,
      shortDescription: event.data.shortDescription,
      description: event.data.description,
      isEnabled: event.data.isEnabled,
      adminMenu: event.data.adminMenu,
      siteMenu: event.data.siteMenu,
      image: articleImage.value || "",
      sort: event.data.sort,
      featuredProducts: event.data.featuredProducts || [],
      createdAt: dateTimeFormat(new Date().toDateString(), Locales.RU),
    };
    console.log(test);

    toast.add({
      title: "Article added",
      color: "green",
    });

    reloadState();
  } catch (error: any) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
  }
};

const onSubmit = useThrottleFn(onSubmitHandler, 3000);

const deleteImageHandler = async () => {
  try {
    await $fetch("/api/image/remove", {
      method: "DELETE",
      body: {
        image: articleImage.value,
      },
    });
    articleImage.value = "";
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
  <UForm
    :schema="schema"
    :state="state"
    @submit="onSubmit"
    class="w-full flex flex-col gap-[50px]"
  >
    <div class="flex gap-[30px] lg:flex-row flex-col-reverse">
      <div class="basis-[60%] flex flex-col gap-[24px]">
        <UFormGroup
          v-for="{ name, label, placeholder, type } in articleData"
          :label="type !== 'toggle' ? label : undefined"
          :name="name"
          :ui="{
            label: {
              base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
            },
          }"
        >
          <UInput
            :placeholder="placeholder"
            v-model="state[name as keyof typeof state]"
            inputClass="no-left-icon"
            v-if="!type"
          />
          <USelectMenu
            v-else-if="type === 'select'"
            multiple
            v-model="state.featuredProducts"
            :options="titles"
            :placeholder="placeholder"
            class="mb-[25px]"
            :uiMenu="{
              option: {
                color: 'dark:text-[#6b7280]',
              },
            }"
            :ui="{
              wrapper: 'select-wrapper',
            }"
          />
          <UTextarea
            v-model="state.shortDescription"
            :placeholder="eng.shortDescription"
            class="textarea"
            v-else-if="type === 'textarea'"
          />
          <div
            class="flex gap-[10px] items-center"
            v-else-if="type === 'toggle'"
          >
            <UToggle
              size="md"
              v-model="state[name as keyof typeof state]"
              :ui="{
                active: 'bg-blue dark:bg-yellow',
              }"
            />
            <span>{{ label }}</span>
          </div>

          <template v-else-if="type === 'tiptap'">
            <TiptapEditor
              :placeholder="placeholder"
              v-model="state.description"
            />
          </template>
        </UFormGroup>
      </div>
      <div
        class="rounded-[8px] basis-[40%] flex flex-col relative group md:mt-[36px] mt-[10px]"
      >
        <UiImageUpload
          :add-new="true"
          v-model:image="articleImage"
          v-model:isLoading="isLoading"
          alt="New Article"
          v-model:input-ref="inputRef"
          v-model:drop-zone-ref="dropZoneRef"
          @delete="deleteImageHandler"
        />
      </div>
    </div>
    <div class="flex justify-end">
      <UButton type="submit" class="dark-button">
        {{ eng.addNewArticle }}
      </UButton>
    </div>
  </UForm>
</template>
