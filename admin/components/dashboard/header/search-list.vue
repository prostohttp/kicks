<script lang="ts" setup>
import type { SearchProductDto } from "./dto/search-product.dto";
import { locale } from "~/lang/locale";

// define
defineProps<{
    data: SearchProductDto[] | undefined;
}>();

// store
const settingsDataStore = useSettingsDataStore();
await useAsyncData(() => settingsDataStore.getSettings());
const { settings } = storeToRefs(settingsDataStore);

// vars
const model = defineModel();
const needCalculate = computed(
    () => settings.value?.mainCurrency.value !== settings.value?.currency.value,
);
</script>

<template>
    <div class="open-sans flex flex-col gap-[16px]">
        <div v-if="data && !data.length">
            <span>{{ locale[settingsDataStore.locale].empty }}</span>
        </div>
        <ul
            v-else
            class="flex flex-col gap-[16px] sm:w-[420px] w-full md:max-h-[400px] max-h-[200px] overflow-y-auto"
        >
            <li v-for="el in data" :key="el._id" class="flex gap-[15px]">
                <NuxtLink
                    :title="`${el.title}`"
                    :to="`/dashboard/products/${el._id}`"
                    class="w-[10%]"
                    @click="model = false"
                >
                    <NuxtImg
                        v-if="el.image"
                        :alt="el.title"
                        :src="`/${el.image}`"
                        width="60"
                    />
                    <NuxtImg
                        v-else
                        :alt="el.title"
                        src="/no-image.svg"
                        width="40"
                    />
                </NuxtLink>
                <div class="flex flex-col w-[80%]">
                    <NuxtLink
                        :to="`/dashboard/products/${el._id}`"
                        activeClass="active"
                        class="text-[16px] font-[600]"
                        @click="model = false"
                    >
                        {{ el.title }}
                    </NuxtLink>
                    <span
                        v-if="el.shortDescription"
                        class="text-[12px] h-[3em] whitespace-normal line-clamp-2"
                    >
                        {{ el.shortDescription }}
                    </span>
                    <div
                        v-if="el.salePrice"
                        class="flex gap-[5px] items-center"
                    >
                        <span class="font-[600]">
                            {{
                                localizedFormatPrice(
                                    settings!.currency.value,
                                    el.salePrice,
                                    needCalculate,
                                    settings!.secondCurrencyRate,
                                )
                            }}
                        </span>
                        <span class="text-[12px] line-through">
                            {{
                                localizedFormatPrice(
                                    settings!.currency.value,
                                    el.regularPrice,
                                    needCalculate,
                                    settings!.secondCurrencyRate,
                                )
                            }}
                        </span>
                    </div>
                    <div v-else class="font-[600]">
                        {{
                            localizedFormatPrice(
                                settings!.currency.value,
                                el.regularPrice,
                                needCalculate,
                                settings!.secondCurrencyRate,
                            )
                        }}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.active {
    @apply text-dark-gray dark:text-fa-white;
}
</style>
