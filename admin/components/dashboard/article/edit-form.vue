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
const toast = useToast();
const dropZoneRef = ref<HTMLInputElement | undefined>();

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
const uploadImageHandler = async (formData: FormData) => {
  const uploadedImage = await $fetch("/api/image/add", {
    method: "POST",
    body: formData,
  });
  if (!uploadedImage) {
    toast.add({ title: eng.noImage, color: "red" });
  }
  await $fetch("/api/article/edit", {
    method: "PUT",
    body: {
      _id: id,
      image: uploadedImage,
    },
  });
};

const uploadImage = async (e: Event) => {
  try {
    let fileInput = e.target as HTMLInputElement;
    const formData = new FormData();
    if (fileInput.files![0]) {
      formData.append("folderName", Constants.IMG_ARTICLES);
      formData.append("image", fileInput.files![0]);
    }
    await uploadImageHandler(formData);
    articleDataStore.getArticle(id);
    toast.add({ title: eng.imageUploaded, color: "green" });
  } catch (_error) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
  }
};

const onDrop = async (files: File[] | null) => {
  try {
    if (files) {
      const formData = new FormData();
      if (files![0]) {
        formData.append("folderName", Constants.IMG_ARTICLES);
        formData.append("image", files![0]);
      }
      await uploadImageHandler(formData);
      articleDataStore.getArticle(id);
      toast.add({ title: eng.imageUploaded, color: "green" });
    }
  } catch (error) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
  }
};

useDropZone(dropZoneRef, { onDrop });

const onSubmitHandler = async (event: FormSubmitEvent<Schema>) => {
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
    toast.add({ title: eng.imageDeleted, color: "green" });
  } catch (_error) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
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
    <div class="flex gap-[30px] lg:flex-row flex-col-reverse">
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
            :placeholder="eng.shortDescription"
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
          v-model:image="article"
          :alt="article?.title"
          v-model:drop-zone-ref="dropZoneRef"
          @delete="deleteImageHandler"
          @change="uploadImage($event)"
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
