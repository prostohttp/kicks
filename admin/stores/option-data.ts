import type { IOption } from "~/pages/dashboard/options/index.vue";
import type { OptionValueDto } from "~/server/api/option-value/dto/option-value.dto";
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
  const optionsWithoutPagination: Ref<OptionDto[] | undefined> = ref();
  const selected: Ref<IOption[]> = ref([]);
  const optionImages: Ref<{
    [id: string]: {
      image: string;
    };
  }> = ref({});
  const titles: Ref<
    Array<{
      _id: string;
      title: string;
      type: string;
      sort: number;
    }>
  > = ref([]);

  // handlers
  const getAllOptions = async (page: number) => {
    try {
      options.value = await $fetch("/api/option/all", {
        method: "GET",
        query: {
          page: page,
        },
      });
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
    return true;
  };

  const getAllOptionsWithoutPagination = async () => {
    try {
      optionsWithoutPagination.value = await $fetch("/api/option/all", {
        method: "GET",
        query: {
          all: true,
        },
      });
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
    return true;
  };

  const getAllTitles = async () => {
    try {
      titles.value = await $fetch("/api/option/all", {
        method: "GET",
        query: {
          titles: true,
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
    return option;
  };

  const addNewValue = async (data: OptionValueDto): Promise<OptionValueDto> => {
    try {
      return await $fetch("/api/option-value/add", {
        method: "POST",
        body: data,
      });
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
  };

  const deleteValue = async (id: string) => {
    try {
      await $fetch("/api/option-value/remove", {
        method: "DELETE",
        body: {
          id,
        },
      });
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
  };

  return {
    option,
    titles,
    optionImages,
    options,
    optionsWithoutPagination,
    selected,
    getOption,
    getAllOptions,
    getAllOptionsWithoutPagination,
    getAllTitles,
    addNewValue,
    deleteValue,
  };
});
