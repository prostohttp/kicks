<script lang="ts" setup>
import { schema, type Schema } from "./schema/article-schema";
import type { FormSubmitEvent } from "#ui/types";
import { eng } from "~/lang/eng";
import { useProductDataStore } from "~/stores/product-data";
import type { InputData } from "~/types/ui/ui.types";
import { Constants } from "~/constants";
import type { ArticleDto } from "~/server/api/article/dto/article.dto";
import * as v from "valibot";

// define
const { articleData, id } = defineProps<{
  articleData: InputData[];
  id: string;
}>();
const article: Ref<ArticleDto | undefined> = defineModel("article");

// Store
const articleDataStore = useArticleDataStore();
const productDataStore = useProductDataStore();
const { titles: data } = storeToRefs(productDataStore);
await productDataStore.getTitles();

// Vars
const titles = ref(data.value.map((el) => el.title));
const isAdmin = useIsAdmin();
const isLoading = ref(false);
const toast = useToast();
const inputRef = ref<HTMLInputElement>();
const dropZoneRef = ref<HTMLDivElement | null>();

const state = reactive({
  title: article.value?.title,
  description: article.value?.description,
  shortDescription: article.value?.shortDescription,
  featuredProducts: article.value?.featuredProducts!.map((el) => el.title),
  adminMenu: article.value?.adminMenu,
  siteMenu: article.value?.siteMenu,
  isEnabled: article.value?.isEnabled,
  sort: Number(article.value?.sort),
});

// Handlers
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

    await $fetch("/api/article/edit", {
      method: "PUT",
      body: {
        _id: id,
        image: uploadedImage,
      },
    });
    articleDataStore.getArticle(id);
    toast.add({ title: eng.imageUploaded, color: "green" });
  } catch (_error) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
  }
  isLoading.value = false;
};

const onDrop = async (files: File[] | null) => {
  if (files && isAdmin) {
    uploadImage(files[0]);
  }
};

useDropZone(dropZoneRef, { onDrop });

const onSubmitHandler = async (event: FormSubmitEvent<Schema>) => {
  isLoading.value = true;
  try {
    await $fetch("/api/article/edit", {
      method: "PUT",
      body: {
        _id: id,
        title: event.data.title,
        shortDescription: event.data.shortDescription,
        description: event.data.description,
        isEnabled: event.data.isEnabled,
        adminMenu: event.data.adminMenu,
        siteMenu: event.data.siteMenu,
        sort: Number(event.data.sort),
        featuredProducts: data.value.filter((el) =>
          event.data.featuredProducts?.includes(el.title),
        ),
      },
    });
    toast.add({
      title: "Article updated",
      color: "green",
    });
    articleDataStore.getAllArticlesForAdminMenu();
    articleDataStore.getArticle(id);
  } catch (error: any) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
  }
  isLoading.value = false;
};

const onSubmit = useThrottleFn(onSubmitHandler, 3000);

const deleteImageHandler = async () => {
  try {
    await $fetch("/api/image/remove", {
      method: "DELETE",
      body: {
        image: article.value?.image,
      },
    });
    await $fetch("/api/article/edit", {
      method: "PUT",
      body: {
        _id: id,
        image: "",
      },
    });
    articleDataStore.getArticle(id);
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
    <div class="flex gap-[30px] lg:flex-row flex-col-reverse">
      <div class="width-[60%] basis-[60%] flex flex-col gap-[24px]">
        <UFormGroup
          v-for="{ name, label, placeholder, type } in articleData"
          :label="type !== 'toggle' ? label : ''"
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
              wrapper: 'select-wrapper ring-1 ring-dark-gray rounded-[8px]',
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
          v-model:image="article"
          :alt="article?.title"
          v-model:input-ref="inputRef"
          v-model:drop-zone-ref="dropZoneRef"
          @delete="deleteImageHandler"
        />
      </div>
    </div>
    <div class="flex justify-end" v-if="isAdmin">
      <UButton type="submit" class="dark-button">
        {{ eng.save }}
      </UButton>
    </div>
  </UForm>
</template>
