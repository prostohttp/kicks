<script lang="ts" setup>
import { eng } from "~/lang/eng";
import type { BreadcrumbItem } from "~/types/ui/ui.types";
import { optionData } from "./data";

// vars
const router = useRouter();
const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(fullPath));

const isSubmit = ref(false);

// handlers
const submitHandler = async () => {
  isSubmit.value = true;
};

// meta
useHead({
  title: eng.addNewOption,
});
</script>

<template>
  <div
    class="flex justify-between items-center sm:flex-row flex-col gap-0 md:gap-[15px]"
  >
    <DashboardBreadcrumbs :links="links" :title="eng.addNewOption" />
    <UButton
      class="h-[48px] px-[26px] py-[10px] flex justify-center items-center uppercase fon-[Rubik] font-[600] shadow-none bg-dark-gray rounded-[8px] hover:bg-dark-gray dark:bg-yellow dark:hover:bg-yellow mb-[24px] hover:text-fa-white dark:hover:text-dark-gray"
      icon="i-heroicons-clipboard-document-20-solid"
      @click="submitHandler"
      :label="eng.save"
    />
  </div>
  <main
    class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
  >
    <div class="flex lg:flex-row flex-col lg:gap-[35px] gap-[20px]">
      <DashboardOptionAddNewForm :optionData="optionData" v-model="isSubmit" />
    </div>
  </main>
</template>
