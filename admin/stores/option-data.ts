import type { IOption } from "~/pages/dashboard/options/index.vue";
import type { OptionDto } from "~/server/api/option/dto/option.dto";

export const useOptionDataStore = defineStore("optionData", () => {
  interface OptionsPayload {
    options: OptionDto[];
    pagesInPagination?: number;
    allItems: number;
    activePage?: number;
  }
  // vars
  const option: Ref<OptionDto | undefined> = ref();
  const options: Ref<OptionsPayload | undefined> = ref();
  const selected: Ref<IOption[]> = ref([]);
  const state = reactive<{ [key: string]: any }>({
    title: "",
    type: "",
    sort: "",
  });

  // handlers
  const addToState = (key: string, value: string) => {
    state[key] = value;
  };

  const getAllOptions = async (page: number) => {
    try {
      options.value = await $fetch("/api/option/all", {
        method: "GET",
        query: {
          page,
        },
      });
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
    return true;
  };

  const getOption = async (id: string) => {
    try {
      option.value = await $fetch("/api/option/one", {
        method: "GET",
        query: {
          id,
        },
      });
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
  };

  return {
    option,
    state,
    options,
    selected,
    addToState,
    getOption,
    getAllOptions,
  };
});
