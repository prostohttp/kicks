<script lang="ts" setup>
import { eng } from "~/lang/eng";
import { Constants } from "~/constants";
import { type BreadcrumbItem } from "~/types/ui/ui.types";
import { useOptionDataStore } from "~/stores/option-data";

export interface IOption {
  id: string;
  title: string;
}

// meta
definePageMeta({
  name: "all-options",
});
useHead({
  title: eng.allOptions,
});

// store
const optionDataStore = useOptionDataStore();
const { options: data, selected } = storeToRefs(optionDataStore);

// vars
const isAdmin = useIsAdmin();
const router = useRouter();
const route = useRoute();
const page = Number(useRoute().query.page);
const columns = [
  {
    key: "option",
    label: "Option",
  },
  {
    key: "sort",
    label: "Sort",
  },
  {
    key: "action",
    label: "Action",
  },
];

await useAsyncData("options", () => optionDataStore.getAllOptions(page));

const activePage = ref(data.value?.activePage || 1);
const path = router.currentRoute.value.path;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(path));

// handlers
const options = computed((): Array<IOption> | undefined => {
  return data.value?.options.map((option) => {
    return {
      id: option._id,
      title: option.title,
    };
  });
});

// hooks
watch(activePage, (newValue) => {
  router.push({ query: { page: newValue } });
  selected.value = [];
  optionDataStore.getAllOptions(newValue!);
});

watch(
  () => route.query,
  (newValue) => {
    if (!newValue.page) {
      activePage.value = 1;
    }
  },
);

onMounted(async () => {
  if (activePage.value) {
    optionDataStore.getAllOptions(activePage.value);
  }
});
</script>

<template>
  <div
    class="flex justify-between items-center sm:flex-row flex-col gap-0 md:gap-[15px]"
  >
    <DashboardBreadcrumbs :links="links" :title="eng.breadcrumbs.options" />
    <UButton
      class="h-[48px] px-[26px] py-[10px] flex justify-center items-center uppercase font-[600] shadow-none bg-dark-gray rounded-[8px] hover:bg-dark-gray dark:bg-yellow dark:hover:bg-yellow mb-[24px] hover:text-fa-white dark:hover:text-dark-gray"
      icon="i-heroicons-plus-circle"
      :label="eng.addNewOption"
      to="/dashboard/options/new"
      v-if="isAdmin"
    />
  </div>
  <main
    class="p-[24px] bg-white flex flex-col rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
  >
    <UTable
      :loading="!options"
      :loading-state="{
        icon: 'i-heroicons-arrow-path-20-solid',
        label: eng.loadingText,
      }"
      :progress="{ color: 'primary', animation: 'carousel' }"
      v-model="selected"
      :rows="options"
      :columns="columns"
      :empty-state="{
        icon: 'i-heroicons-circle-stack-20-solid',
        label: eng.empty,
      }"
      :ui="{
        td: {
          base: 'md:whitespace-pre-wrap md:break-all whitespace-normal break-normal',
          color: 'text-dark-gray dark:text-fa-white',
        },
        default: {
          checkbox: {
            class: 'checkbox',
          },
        },
      }"
      class="text-dark-gray"
    >
      <template #caption>
        <caption
          class="pb-[15px] w-full justify-between items-center text-left text-[20px] dark:text-fa-white font-[Rubik] font-[500] relative"
        >
          <span>
            {{ eng.breadcrumbs.options }}
          </span>
          <DashboardOptionMenuAction
            v-model:activePage="activePage"
            v-if="isAdmin"
          />
        </caption>
      </template>
      <!-- <template #image-data="{ row }">
        <NuxtLink :to="`/dashboard/options/${row.id}`">
          <img
            src="~/public/no-image.svg"
            :alt="eng.noImage"
            class="w-[40px] dark:brightness-0 dark:invert-[0.5]"
            v-if="!row.image"
          />
          <img
            :src="`/${row.image}`"
            :alt="eng.noImage"
            class="w-[40px] dark:brightness-0 dark:invert-[0.5]"
            v-else
          />
        </NuxtLink>
      </template>
      <template #title-data="{ row }">
        <NuxtLink :to="`/dashboard/articles/${row.id}`">
          {{ row.title }}
        </NuxtLink>
      </template> -->
    </UTable>
  </main>
  <UiPagination
    v-if="data?.pagesInPagination"
    v-model="activePage"
    :element-in-page="Constants.PER_PAGE_OPTION"
    :allItems="data?.allItems"
  />
</template>

<style scoped>
.active {
  @apply dark:text-fa-white dark:hover:text-yellow text-dark-gray hover:text-blue;
}
</style>
