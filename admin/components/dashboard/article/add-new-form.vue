<script lang="ts" setup>
import { schema, type Schema } from "./schema/article-schema";
import type { FormSubmitEvent } from "#ui/types";
import { eng } from "~/lang/eng";
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
const isAdmin = useIsAdmin();
await productDataStore.getTitles();
const titles = ref(data.value.map((el) => el.title));
const isLoading = ref(false);
const toast = useToast();
const inputRef = ref<HTMLInputElement>();
const dropZoneRef = ref<HTMLDivElement | null>();

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
      title: "Article added",
      color: "green",
    });
    articleDateStore.getAllArticlesForAdminMenu();
    clearState();
  } catch (error: any) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
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

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));
</script>

<template>
  <UForm
    :schema="v.safeParser(schema)"
    :state="state"
    @submit="protectedSubmitHandler"
    class="w-full flex flex-col gap-[50px]"
  >
    <UiSpinner v-if="isLoading" />
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
            v-model="state[name as keyof typeof state]"
            inputClass="no-left-icon"
            v-if="type === 'text'"
          />
          <UInput
            :placeholder="placeholder"
            v-model="state[name as keyof typeof state]"
            inputClass="no-left-icon"
            v-if="type === 'number'"
            type="number"
            min="1"
          />
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
          <UTextarea
            v-model="state.shortDescription"
            :placeholder="eng.shortDescription"
            class="textarea"
            v-else-if="type === 'textarea'"
          />
          <div
            class="flex gap-[10px] items-center mb-[10px]"
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
          <TiptapEditor
            :placeholder="placeholder"
            v-model="state.description"
            v-else-if="type === 'tiptap'"
          />
        </UFormGroup>
      </div>
      <div
        class="rounded-[8px] width-[40%] basis-[40%] flex flex-col relative group md:mt-[36px] mt-[10px]"
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
