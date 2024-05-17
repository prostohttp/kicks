<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { eng } from "~/lang/eng";
import { ModelNamesForSearchEngine } from "~/types/server/server.types";
import type { SearchProductDto } from "./dto/search-product.dto";
import { Constants } from "~/constants";

// vars
const query = ref("");
const target: Ref<HTMLInputElement | null> = ref(null);
const isActive = ref(false);
const isOpen = ref(false);
const error = ref("");
const founded: Ref<SearchProductDto[] | undefined> = ref();

// handlers
onClickOutside(target, () => (isOpen.value = false));

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

const searchThrottleHandler = useThrottleFn(searchHandler, 500);

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

// hooks
watch(query, (oldValue, newValue) => {
  showSearchResultHandler();
  if (oldValue !== newValue) {
    searchHandler();
    // searchThrottleHandler();
  }
});
</script>

<template>
  <div class="flex gap-[10px] items-center">
    <div class="flex items-center w-[40px] h-[40px] justify-center">
      <UIcon
        v-if="!isActive"
        name="i-heroicons-magnifying-glass-20-solid"
        class="bg-dark-gray w-[24px] h-[24px] dark:bg-fa-white cursor-pointer hover:bg-blue dark:hover:bg-yellow"
        @click="showSearchInputHandler"
      />
    </div>
    <UInput
      v-if="isActive"
      input-class="bg-transparent border-dark-gray dark:border-fa-white h-[40px] pl-[44px] text-dark-gray w-[200px] relative"
      v-model="query"
      name="q"
      @keyup="prettySearchHandler"
      :placeholder="`${eng.search}...`"
      autocomplete="off"
      ref="target"
      autofocus
      icon="i-heroicons-magnifying-glass-20-solid"
      :ui="{
        icon: {
          trailing: { pointer: '' },
        },
      }"
    >
      <Transition>
        <div
          class="absolute top-[90px] right-0 rounded-[8px] bg-white p-[20px] min-w-[210px] text-dark-gray dark:text-fa-white dark:bg-dark-bg flex flex-col gap-[16px]"
          v-if="isOpen"
        >
          <h3 class="font-[Rubik] text-[20px] font-[600]">
            {{ eng.searchResult }}
          </h3>
          <DashboardHeaderSearchList :data="founded" @close="isOpen = false" />
          <NuxtLink
            v-if="founded && founded.length"
            to="/dashboard/search"
            @click="hideSearchInputHandler"
            class="text-[16px] font-[600] text-blue dark:text-yellow hover:text-dark-gray dark:hover:text-fa-white"
          >
            {{ eng.seeAll }}
          </NuxtLink>
        </div>
      </Transition>
      <template #leading>
        <UButton
          class="text-dark-gray hover:text-blue dark:text-fa-white"
          variant="link"
          icon="i-heroicons-magnifying-glass-20-solid"
          :padded="true"
        />
      </template>
      <template #trailing>
        <UButton
          class="text-dark-gray hover:text-blue dark:text-fa-white"
          variant="link"
          icon="i-heroicons-x-mark-20-solid"
          :padded="true"
          @click="hideSearchInputHandler"
        />
      </template>
    </UInput>
  </div>
</template>
