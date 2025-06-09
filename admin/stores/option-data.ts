import type { IOption } from "~/pages/dashboard/options/index.vue";
import type {
    ExtendedOptionValueDto,
    OptionValueDto,
} from "~/server/api/option-value/dto/option-value.dto";
import type {
    OptionDto,
    OptionDtoWithValues,
} from "~/server/api/option/dto/option.dto";

interface OptionsPayload {
    options: OptionDto[];
    pagesInPagination?: number;
    allItems: number;
    activePage?: number;
}

export const useOptionDataStore = defineStore("optionData", () => {
    // store
    const productDataStore = useProductDataStore();

    // vars
    const option: Ref<OptionDtoWithValues | undefined> = ref();
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
        return option.value;
    };

    const getOptions = async (ids: string[]): Promise<OptionDto[]> => {
        try {
            return await $fetch("/api/option/many", {
                method: "POST",
                body: { ids },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
    };

    const addNewOptionValueToTable = (
        values: ExtendedOptionValueDto[] | undefined,
    ) => {
        if (values && Array.isArray(values)) {
            values.push({
                _id: Date.now().toString(),
                value: {
                    value: "",
                    label: "",
                },
                sort: 1,
                image: "",
                new: true,
            });
        }
    };

    const addNewOptionValueToDatabase = async (
        data: ExtendedOptionValueDto,
    ): Promise<OptionValueDto> => {
        try {
            const { _id, ...result } = data;
            const option = { ...result, value: data.value.label };
            return await $fetch("/api/option-value/add", {
                method: "POST",
                body: option,
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
    };

    const editOptionValueFromDatabase = async (
        data: ExtendedOptionValueDto,
    ): Promise<OptionValueDto> => {
        try {
            return await $fetch("/api/option-value/edit", {
                method: "PUT",
                body: { ...data, value: data.value.label },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
    };

    const deleteValue = async (_id: string) => {
        try {
            await $fetch("/api/option-value/remove", {
                method: "DELETE",
                body: { _id },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
    };

    const deleteValues = async (ids: string[]) => {
        try {
            await $fetch("/api/option-value/remove", {
                method: "DELETE",
                body: { ids },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
    };

    const deleteOptions = async (optionIds: string[]) => {
        try {
            const optionValueIds: string[] = [];
            const options = await getOptions(optionIds);

            for (const option of options) {
                if (option.values?.length) {
                    for (const id of option.values) {
                        optionValueIds.push(id);
                    }
                }
            }
            await deleteValues(optionValueIds);
            await productDataStore.editProductsByOptionIds(optionIds);
            await $fetch("/api/option/remove", {
                method: "DELETE",
                body: { ids: optionIds },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
    };

    const getValuesById = async (
        ids: string[],
    ): Promise<ExtendedOptionValueDto[]> => {
        try {
            const options: OptionValueDto[] = await $fetch(
                "/api/option-value/many",
                {
                    method: "POST",
                    body: { ids },
                },
            );
            return options.map((item) => ({
                ...item,
                value: {
                    value: item._id!,
                    label: item.value,
                },
            }));
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
        getOptions,
        getAllOptions,
        getAllOptionsWithoutPagination,
        getAllTitles,
        addNewOptionValueToTable,
        addNewOptionValueToDatabase,
        editOptionValueFromDatabase,
        deleteOptions,
        deleteValue,
        getValuesById,
    };
});
