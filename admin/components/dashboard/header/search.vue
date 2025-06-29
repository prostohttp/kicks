<script lang="ts" setup>
import { onClickOutside, useDebounceFn, type MaybeElementRef } from "@vueuse/core";
import { locale } from "~/lang/locale";
import { ModelNamesForSearchEngine } from "~/types/server/server.types";
import type { SearchProductDto } from "./dto/search-product.dto";
import { Constants } from "~/constants";

// vars
const query = ref("");
const target = useTemplateRef("target");
const isActive = ref(false);
const isOpen = ref(false);
const founded: Ref<SearchProductDto[] | undefined> = ref();
const metaPressed = ref(false);

// store
const settingsDataStore = useSettingsDataStore();

// handlers
onClickOutside(target as MaybeElementRef, () => (isOpen.value = false));

const showSearchResultHandler = () => {
    if (!query.value) {
        isOpen.value = false;
    } else {
        isOpen.value = true;
    }
};

const searchHandler = async () => {
    const data = await $fetch("/api/search/all", {
        method: "GET",
        query: {
            searchModel: ModelNamesForSearchEngine.PRODUCT,
            searchPhrase: query.value,
            limit: Constants.SEARCH_LIMIT,
        },
        pick: ["results"],
    });
    founded.value = data.result.products.data;
};

const debounceSearchHandler = useDebounceFn(
    () => {
        searchHandler();
    },
    1000,
    {
        maxWait: 5000,
    },
);

const prettySearchHandler = (event: KeyboardEvent) => {
    if (event.code === "ArrowDown" || event.code === "Enter") {
        if (query.value) {
            isOpen.value = true;
        }
    }
    if (event.code === "Escape") {
        isOpen.value = false;
    }
};

const showSearchInputHandler = () => {
    isActive.value = true;
    if (query.value) {
        isOpen.value = true;
    }
};

const hideSearchInputHandler = () => {
    isOpen.value = false;
    isActive.value = false;
};

const searchHandlerWithShortcut = (event: KeyboardEvent) => {
    if (event.code === "ControlLeft") {
        metaPressed.value = true;
    }
    if (metaPressed.value && event.code === "Enter" && query.value) {
        navigateTo(`/dashboard/search?searchPhrase=${query.value}`);
        metaPressed.value = false;
        hideSearchInputHandler();
    }
};
// hooks
watch(query, (oldValue, newValue) => {
    showSearchResultHandler();
    if (oldValue !== newValue) {
        debounceSearchHandler();
    }
});

// TODO: locale[settingsDataStore.locale].search конструкция вызывает запрос к бд!
</script>

<template>
    <div class="flex gap-[10px] items-center">
        <div class="flex items-center w-[40px] h-[40px] justify-center">
            <UIcon
                v-if="!isActive"
                class="bg-dark-gray w-[24px] h-[24px] dark:bg-fa-white cursor-pointer hover:bg-blue dark:hover:bg-yellow"
                name="i-heroicons-magnifying-glass-20-solid"
                @click="showSearchInputHandler"
            />
        </div>
        <UInput
            v-if="isActive"
            ref="target"
            v-model="query"
            :placeholder="`${locale[settingsDataStore.locale].search}...`"
            :ui="{
                icon: {
                    trailing: { pointer: '' },
                },
            }"
            autocomplete="off"
            autofocus
            icon="i-heroicons-magnifying-glass-20-solid"
            input-class=" border-dark-gray dark:border-fa-white h-[40px] pl-[44px] text-dark-gray sm:w-[200px] w-[calc(100%-30px)] z-[100] sm:relative sm:left-0 sm:top-0 fixed left-[20px] top-[32px]"
            name="query"
            @keydown="searchHandlerWithShortcut"
            @keyup="prettySearchHandler"
        >
            <Transition>
                <div
                    v-if="isOpen"
                    class="md:absolute fixed top-[90px] md:right-0 right-[10px] rounded-[8px] bg-white p-[20px] md:min-w-[250px] md:w-auto w-[calc(100%-30px)] text-dark-gray dark:text-fa-white dark:bg-dark-bg flex flex-col gap-[16px] z-[101]"
                >
                    <h3 class="font-[Rubik] text-[20px] font-[600]">
                        {{ locale[settingsDataStore.locale].searchResult }}
                    </h3>
                    <DashboardHeaderSearchList
                        v-model="isOpen"
                        :data="founded"
                    />
                    <NuxtLink
                        v-if="founded && founded.length"
                        :to="`/dashboard/search?searchPhrase=${query}`"
                        class="text-[16px] font-[600] text-blue dark:text-yellow hover:text-dark-gray dark:hover:text-fa-white"
                        @click="hideSearchInputHandler"
                    >
                        {{ locale[settingsDataStore.locale].seeAll }}
                    </NuxtLink>
                </div>
            </Transition>
            <template #leading>
                <UButton
                    :padded="true"
                    class="text-dark-gray hover:text-blue dark:text-fa-white fixed sm:static left-[25px] top-[37px] z-[101]"
                    icon="i-heroicons-magnifying-glass-20-solid"
                    variant="link"
                />
            </template>
            <template #trailing>
                <UButton
                    :padded="true"
                    class="text-dark-gray hover:text-blue dark:text-fa-white fixed sm:static right-[20px] top-[37px] z-[101]"
                    icon="i-heroicons-x-mark-20-solid"
                    variant="link"
                    @click="hideSearchInputHandler"
                />
            </template>
        </UInput>
    </div>
</template>
