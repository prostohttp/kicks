<script lang="ts" setup>
import { schema, type Schema } from "./schema/article-schema";
import type { FormSubmitEvent } from "#ui/types";
import { locale } from "~/lang/locale";
import { useProductDataStore } from "~/stores/product-data";
import { usePersistDataStore } from "~/stores/persist-data.js";
import type { InputData } from "~/types/ui/ui.types";
import { Constants } from "~/constants";
import * as v from "valibot";

// define
const { articleData } = defineProps<{ articleData: InputData[] }>();

// Store
const articleDateStore = useArticleDataStore();
const persistDataStore = usePersistDataStore();
const productDataStore = useProductDataStore();
const { titles: data } = storeToRefs(productDataStore);
const { articleImage } = storeToRefs(persistDataStore);

// Vars
const isLoading = ref(false);
const isAdmin = useIsAdmin();
await productDataStore.getTitles();
const titles = ref(data.value.map((el) => el.title));
const toast = useToast();
const dropZoneRef = ref<HTMLInputElement | undefined>();

const state = reactive({
  title: "",
  description: "",
  shortDescription: "",
  featuredProducts: [],
  adminMenu: false,
  siteMenu: false,
  isEnabled: true,
  sort: "",
});

// Handlers
const clearState = () => {
  state.title = "";
  state.shortDescription = "";
  state.description = "";
  state.featuredProducts = [];
  state.adminMenu = false;
  state.isEnabled = true;
  state.siteMenu = false;
  state.sort = "";
};

const uploadImageHandler = async (formData: FormData) => {
  const uploadedImage = await $fetch("/api/image/add", {
    method: "POST",
    body: formData,
  });
  if (!uploadedImage) {
    toast.add({
      title: locale[useSettingsDataStore().locale].noImage,
      color: "red",
    });
  }
  return uploadedImage;
};

const uploadImage = async (e: Event) => {
  try {
    let fileInput = e.target as HTMLInputElement;
    const formData = new FormData();
    if (fileInput.files![0]) {
      formData.append("folderName", Constants.IMG_ARTICLES);
      formData.append("image", fileInput.files![0]);
    }
    const uploadedImage = await uploadImageHandler(formData);
    articleImage.value = uploadedImage;
    toast.add({
      title: locale[useSettingsDataStore().locale].imageUploaded,
      color: "green",
    });
  } catch (_error) {
    toast.add({
      title: locale[useSettingsDataStore().locale].somethingWentWrong,
      color: "red",
    });
  }
};

const onDrop = async (files: File[] | null) => {
  try {
    if (files) {
      const formData = new FormData();
      if (files![0]) {
        formData.append("image", files[0]);
        formData.append("folderName", Constants.IMG_ARTICLES);
      }
      const uploadedImage = await uploadImageHandler(formData);
      articleImage.value = uploadedImage;
      toast.add({
        title: locale[useSettingsDataStore().locale].imageUploaded,
        color: "green",
      });
    }
  } catch (error) {
    toast.add({
      title: locale[useSettingsDataStore().locale].somethingWentWrong,
      color: "red",
    });
  }
};

useDropZone(dropZoneRef, { onDrop });

const onSubmitHandler = async (event: FormSubmitEvent<Schema>) => {
  isLoading.value = true;
  try {
    await $fetch("/api/article/add", {
      method: "POST",
      body: {
        title: event.data.title,
        shortDescription: event.data.shortDescription,
        description: event.data.description,
        isEnabled: event.data.isEnabled,
        adminMenu: event.data.adminMenu,
        siteMenu: event.data.siteMenu,
        image: articleImage.value || "",
        sort: event.data.sort,
        featuredProducts: data.value.filter((el) =>
          event.data.featuredProducts?.includes(el.title),
        ),
        createdAt: new Date(),
      },
    });
    articleImage.value = "";
    toast.add({
      title: locale[useSettingsDataStore().locale].addNewArticle,
      color: "green",
    });
    articleDateStore.getAllArticlesForAdminMenu();
    clearState();
  } catch (error: any) {
    toast.add({
      title: locale[useSettingsDataStore().locale].somethingWentWrong,
      color: "red",
    });
  }
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
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
    toast.add({
      title: locale[useSettingsDataStore().locale].imageDeleted,
      color: "green",
    });
  } catch (_error) {
    toast.add({
      title: locale[useSettingsDataStore().locale].somethingWentWrong,
      color: "red",
    });
  }
};

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));
</script>

<template>
  <UForm
    :schema="v.safeParser(schema)"
    :state="state"
    @submit="protectedSubmitHandler"
    class="w-full flex flex-col gap-[50px]"
  >
    <LazyUiSpinner v-if="isLoading" />
    <div class="flex gap-[30px] lg:flex-row flex-col-reverse" v-else>
      <div class="width-[60%] basis-[60%] flex flex-col gap-[24px]">
        <UFormGroup
          v-for="{ name, label, placeholder, type } in articleData"
          :label="type !== 'toggle' ? label : ''"
          :name="name"
          :key="name"
          :ui="{
            label: {
              base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
            },
          }"
        >
          <UInput
            :placeholder="placeholder"
            v-model="state.title"
            inputClass="no-left-icon"
            v-if="name === 'title'"
          />
          <UTextarea
            v-model="state.shortDescription"
            :placeholder="
              locale[useSettingsDataStore().locale].shortDescription
            "
            class="textarea"
            v-else-if="name === 'shortDescription'"
          />
          <TiptapEditor
            :placeholder="placeholder"
            v-model="state.description"
            v-else-if="name === 'description'"
          />
          <UInput
            :placeholder="placeholder"
            v-model="state.sort"
            inputClass="no-left-icon"
            v-if="name === 'sort'"
            type="number"
            min="1"
          />
          <div
            class="flex gap-[10px] items-center mb-[10px]"
            v-else-if="name === 'siteMenu'"
          >
            <UToggle
              size="md"
              v-model="state.siteMenu"
              :ui="{
                active: 'bg-blue dark:bg-yellow',
              }"
            />
            <span>{{ label }}</span>
          </div>
          <div
            class="flex gap-[10px] items-center mb-[10px]"
            v-else-if="name === 'adminMenu'"
          >
            <UToggle
              size="md"
              v-model="state.adminMenu"
              :ui="{
                active: 'bg-blue dark:bg-yellow',
              }"
            />
            <span>{{ label }}</span>
          </div>
          <USelectMenu
            multiple
            v-model="state.featuredProducts"
            :options="titles"
            :placeholder="placeholder"
            :uiMenu="{
              option: {
                color: 'dark:text-[#6b7280]',
              },
            }"
            :ui="{
              wrapper: 'select-wrapper',
            }"
            v-else-if="type === 'select'"
          />
          <div
            class="flex gap-[10px] items-center mb-[10px]"
            v-else-if="name === 'isEnabled'"
          >
            <UToggle
              size="md"
              v-model="state.isEnabled"
              :ui="{
                active: 'bg-blue dark:bg-yellow',
              }"
            />
            <span>{{ label }}</span>
          </div>
        </UFormGroup>
      </div>
      <div
        class="rounded-[8px] width-[40%] basis-[40%] flex flex-col relative group md:mt-[36px] mt-[10px]"
      >
        <UiImageUpload
          :add-new="true"
          v-model:image="articleImage"
          alt="New Article"
          v-model:drop-zone-ref="dropZoneRef"
          @delete="deleteImageHandler"
          @change="uploadImage($event)"
        />
      </div>
    </div>
    <div class="flex justify-end">
      <UButton type="submit" class="dark-button">
        {{ locale[useSettingsDataStore().locale].addNewArticle }}
      </UButton>
    </div>
  </UForm>
</template>
