import { eng } from "~/lang/eng";
import type { IOption } from "~/pages/dashboard/options/index.vue";
import type { OptionDto } from "~/server/api/option/dto/option.dto";
import type { UiOptionDto } from "~/types/server/server.types";

export const useOptionDataStore = defineStore("optionData", () => {
  interface OptionsPayload {
    options: OptionDto[];
    pagesInPagination?: number;
    allItems: number;
    activePage?: number;
  }

  // vars
  let option: UiOptionDto = reactive({
    _id: "",
    title: "",
    type: "",
    sort: undefined,
    values: undefined,
  });

  const options: Ref<OptionsPayload | undefined> = ref();

  const selected: Ref<IOption[]> = ref([]);

  const optionImages: Ref<{
    [id: string]: {
      image: string;
    };
  }> = ref({});

  // handlers
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
      const rawOption = await $fetch<OptionDto>("/api/option/one", {
        method: "GET",
        query: {
          id,
        },
      });
      option._id = rawOption._id;
      option.title = rawOption.title;
      option.type = rawOption.type;
      option.sort = rawOption.sort;
      option.values = getUiOption(rawOption);
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
    return true;
  };

  const isVisibleTable = computed(
    () =>
      option?.type === eng.optionTypes.list ||
      option?.type === eng.optionTypes.select ||
      option?.type === eng.optionTypes.checkbox,
  );

  const clearState = () => {
    if (option) {
      option.title = "";
      option.type = "";
      option.sort = undefined;
      option.values = undefined;
    }
  };

  return {
    isVisibleTable,
    option,
    optionImages,
    options,
    selected,
    getOption,
    getAllOptions,
    clearState,
  };
});
