<script lang="ts" setup>
import { eng } from "~/lang/eng";
import type { BreadcrumbItem } from "~/types/ui/ui.types";
import { optionData } from "./data";

// store
const optionDataStore = useOptionDataStore();
await useAsyncData("options", () =>
  optionDataStore.getOption(useRoute().params.option.toString()),
);
const { option } = storeToRefs(optionDataStore);

// vars
let staticTitle = option.value.title;
const router = useRouter();
const id = useRoute().params.option.toString();

const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(
  breadcrumbsArrayFactory(fullPath, staticTitle, fullPath),
);
const isAdmin = useIsAdmin();
const isSubmit = ref(false);
const title = ref(option.value.title || eng.empty);

// handlers
const submitHandler = async () => {
  isSubmit.value = true;
};

// meta
useHeadSafe({
  title: title,
});

// hooks
watch(isSubmit, (newValue) => {
  if (newValue) {
    staticTitle = option.value.title;
    title.value = option.value.title;
    links.value = breadcrumbsArrayFactory(fullPath, staticTitle, fullPath);
  }
});

onUnmounted(() => {
  optionDataStore.clearState();
});
</script>

<template>
  <div
    class="flex justify-between items-center sm:flex-row flex-col gap-0 md:gap-[15px]"
  >
    <DashboardBreadcrumbs :links="links" :title="staticTitle || eng.empty" />
    <UButton
      class="h-[48px] px-[26px] py-[10px] flex justify-center items-center uppercase fon-[Rubik] font-[600] shadow-none bg-dark-gray rounded-[8px] hover:bg-dark-gray dark:bg-yellow dark:hover:bg-yellow mb-[24px] hover:text-fa-white dark:hover:text-dark-gray"
      icon="i-heroicons-clipboard-document-20-solid"
      @click="submitHandler"
      :label="eng.save"
      v-if="option && isAdmin"
    />
  </div>
  <main
    class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
  >
    <div class="flex lg:flex-row flex-col lg:gap-[35px] gap-[20px]">
      <UiEmpty v-if="!option._id" />
      <DashboardOptionEditForm
        :optionData="optionData"
        :id="id"
        v-model:submit="isSubmit"
        v-else
      />
    </div>
    <pre>{{ option }}</pre>
  </main>
</template>
