<script lang="ts" setup>
import { eng } from "~/lang/eng";
import type { IArticle } from "~/pages/dashboard/articles/index.vue";

// define
const emit = defineEmits(["delete", "close"]);
const { articles } = defineProps<{
  articles: IArticle[] | undefined;
}>();

// vars
const toast = useToast();

// handlers
const getIdsHelper = (articles: IArticle[]): string[] => {
  return articles.map((category) => category.id);
};

const deleteArticle = async () => {
  try {
    await $fetch("/api/article/remove", {
      method: "DELETE",
      body: {
        ids: articles ? getIdsHelper(articles) : [],
      },
    });
    toast.add({ title: eng.successDeleteMessage, color: "green" });
    emit("delete");
  } catch (_error) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
  }
};
</script>

<template>
  <UModal :transition="false" class="bg-fa-white opacity-100" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ eng.deleteArticle }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="$emit('close')"
          />
        </div>
      </template>
      <div class="flex flex-col gap-[20px]">
        <p class="dark:text-fa-white">{{ eng.deleteArticleText }}</p>
        <div class="flex gap-[10px] mt-auto justify-end">
          <UButton
            class="bg-dark-gray dark:bg-grey dark:text-dark-gray dark:hover:bg-grey dark:hover:text-dark-gray hover:bg-dark-bg uppercase"
            @click="$emit('close')"
          >
            {{ eng.cancel }}
          </UButton>
          <UButton
            @click="deleteArticle"
            class="bg-danger hover:bg-danger uppercase dark:bg-danger dark:text-fa-white dark:hover:bg-danger dark:hover:text-fa-white"
          >
            {{ eng.deleteArticle }}
          </UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>
