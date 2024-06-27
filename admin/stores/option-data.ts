import { eng } from "~/lang/eng";
import type { IOption } from "~/pages/dashboard/options/index.vue";
import type { OptionDto } from "~/server/api/option/dto/option.dto";

export const useOptionDataStore = defineStore("optionData", () => {
  interface OptionsPayload {
    options: OptionDto[];
    pagesInPagination?: number;
    allItems: number;
    activePage?: number;
  }

  interface IState {
    title: string;
    type: string;
    sort: number | undefined;
    values: {
      [key: string]:
        | {
            id: number;
            value: string;
            image: string;
            sort: number | undefined;
          }
        | undefined;
    };
  }
  // vars
  const option: Ref<OptionDto | undefined> = ref();
  const options: Ref<OptionsPayload | undefined> = ref();
  const selected: Ref<IOption[]> = ref([]);
  const state = reactive<IState>({
    title: "",
    type: "",
    sort: undefined,
    values: {},
  });
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

  const setStateFromOption = (option: OptionDto) => {
    state.title = option.title;
    state.type = option.type;
    state.sort = option.sort;
    if (option.values?.length) {
      for (const opt of option.values) {
        state.values[opt.id] = {
          id: opt.id,
          value: opt.value,
          sort: opt.sort,
          image: opt.image || "",
        };
      }
    }
  };

  const getOption = async (id: string) => {
    try {
      option.value = await $fetch("/api/option/one", {
        method: "GET",
        query: {
          id,
        },
      });
      if (option.value) {
        console.log(option.value.type);
        setStateFromOption(option.value);
      }
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
    return true;
  };

  const isVisibleTable = computed(
    () =>
      state.type === eng.optionTypes.list ||
      state.type === eng.optionTypes.select ||
      state.type === eng.optionTypes.checkbox,
  );

  return {
    isVisibleTable,
    option,
    optionImages,
    state,
    options,
    selected,
    getOption,
    getAllOptions,
  };
});
