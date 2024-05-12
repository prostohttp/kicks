import { defineStore } from "pinia";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

export const useBreadcrumbsDataStore = defineStore(
  "breadcrumbsData",
  () => {
    // vars
    const breadcrumbs: Ref<BreadcrumbItem[]> = ref([]);
    // handlers
    const addPageToBreadcrumbs = (page: BreadcrumbItem) => {
      breadcrumbs.value.push(page);
    };
    const removeItemFromBreadcrumbs = (index: number) => {};
    // computed
    return {
      breadcrumbs,
    };
  },
  {
    persist: true,
  },
);
