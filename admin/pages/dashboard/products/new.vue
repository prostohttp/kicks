<script lang="ts" setup>
import type { FormErrorEvent } from "#ui/types";
import { locale } from "~/lang/locale";
import type { BreadcrumbItem } from "~/types/ui/ui.types";
import { validate } from "./validator";
import type { FlatProductDto } from "~/server/api/product/dto/product.dto";

// store
const settingsDataStore = useSettingsDataStore();
const productDataStore = useProductDataStore();
const categoryDataStore = useCategoryDataStore();
const brandDataStore = useBrandDataStore();
const { brand } = storeToRefs(brandDataStore);
const { titles: categoryTitles } = storeToRefs(categoryDataStore);
await useAsyncData(() => settingsDataStore.getSettings());
const { locale: storeLocale } = storeToRefs(settingsDataStore);

// vars
const initialState: FlatProductDto = {
    title: "",
    shortDescription: "",
    quantity: 1,
    regularPrice: 100,
    category: [],
    brand: "",
    isEnabled: {
        label: locale[storeLocale.value].isEnabled,
        value: true,
    },
    options: [],
    tags: [],
    additionImages: [],
};
const toast = useToast();
const isAdmin = checkIsAdmin();
const router = useRouter();
const route = useRoute();
const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(fullPath));
const items = [
    {
        slot: "data",
        label: locale[storeLocale.value].productData,
        tab: "data",
    },
    {
        slot: "options",
        label: locale[storeLocale.value].productOptions,
        tab: "options",
    },
];
const state: Ref<FlatProductDto> = ref({ ...initialState });
const isValidForm = ref(true);

const selected = computed({
    get() {
        const index = items.findIndex((item) => item.tab === route.query.tab);
        if (index === -1) {
            return 0;
        }
        return index;
    },
    set(val) {
        router.replace({
            query: { tab: items[val].tab },
        });
    },
});

// handlers
const onSubmitHandler = async () => {
    try {
        if (state.value.brand) {
            await brandDataStore.getBrandByTitle(state.value.brand);
        }
        const data = {
            ...state.value,
            options: state.value?.options.map((option) => {
                const values = [];
                for (const opt of option.values!) {
                    if (opt.optionValue.value.label) {
                        values.push({
                            ...opt,
                            optionValue: opt.optionValue.value.value,
                        });
                    }
                }
                return {
                    ...option,
                    optionValue: option.optionValue._id,
                    values: values,
                };
            }),
            category: categoryTitles.value
                .filter((el) => state.value.category?.includes(el.title))
                .map((el) => el._id),
            brand: brand.value?._id || null,
            createdAt: new Date(),
        };
        await $fetch("/api/product/add", {
            method: "POST",
            body: data,
        });
        isValidForm.value = true;
        await productDataStore.getProductCount();
        toast.add({
            title: locale[storeLocale.value].successAddMessage,
            color: "green",
            callback: () => {
                return navigateTo("/dashboard/products", { redirectCode: 201 });
            },
        });
    } catch (error: any) {
        toast.add({ title: error.message, color: "red" });
    }
    setTimeout(() => {}, 300);
};
const onSubmit = useThrottleFn(onSubmitHandler, 3000);

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));

async function onError(event: FormErrorEvent) {
    if (
        event.errors.length ||
        (state.value.options && state.value.options.length > 1)
    ) {
        isValidForm.value = false;
    } else {
        isValidForm.value = true;
    }
}

// meta
useHead({
    title: locale[settingsDataStore.locale].addNewProduct,
});
</script>

<template>
    <DashboardBreadcrumbs
        :links="links"
        :title="locale[settingsDataStore.locale].addNewProduct"
    />
    <main
        class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
    >
        <div class="space-y-4 w-full">
            <div
                v-if="!isValidForm"
                class="bg-dark-gray dark:bg-yellow text-fa-white dark:text-dark-gray w-full text-center py-[5px] mb-[10px] rounded-[8px]"
            >
                {{ locale[settingsDataStore.locale].error.checkRequiredFields }}
            </div>
            <UForm
                :state="state!"
                :validate="validate"
                class="flex flex-col lg:gap-[35px] gap-[20px]"
                @error="onError"
                @submit="protectedSubmitHandler"
            >
                <UTabs v-model="selected" :items="items" class="w-full">
                    <template #data>
                        <DashboardProductDataTab
                            v-model:state="state"
                            :isSaved="false"
                        />
                    </template>
                    <template #options>
                        <DashboardProductOptionTab
                            v-model:options="state.options"
                        />
                    </template>
                </UTabs>
                <div>
                    <UButton
                        v-if="isAdmin"
                        class="dark-button my-[10px]"
                        type="submit"
                    >
                        {{ locale[storeLocale].save }}
                    </UButton>
                </div>
            </UForm>
        </div>
    </main>
</template>
