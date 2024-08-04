<script lang="ts" setup>
import { Currency, Locales } from "~/types/ui/ui.types";
import type { SearchProductDto } from "./dto/search-product.dto";
import { locale } from "~/lang/locale";

defineProps<{
  data: SearchProductDto[] | undefined;
}>();

const model = defineModel();
</script>

<template>
  <div class="open-sans flex flex-col gap-[16px]">
    <div v-if="data && !data.length">
      <span>{{ locale["en"].empty }}</span>
    </div>
    <ul
      class="flex flex-col gap-[16px] sm:w-[420px] w-full md:max-h-[400px] max-h-[200px] overflow-y-auto"
      v-else
    >
      <li v-for="el in data" :key="el._id" class="flex gap-[15px]">
        <NuxtLink
          :to="`/dashboard/products/${el._id}`"
          :title="`${el.title}`"
          class="w-[10%]"
          @click="model = false"
        >
          <NuxtImg
            v-if="el.image"
            :src="`/${el.image}`"
            width="60"
            :alt="el.title"
            class="image"
          />
          <NuxtImg
            src="/no-image.svg"
            width="40"
            :alt="el.title"
            class="image"
            v-else
          />
        </NuxtLink>
        <div class="flex flex-col w-[80%]">
          <NuxtLink
            activeClass="active"
            :to="`/dashboard/products/${el._id}`"
            class="text-[16px] font-[600]"
            @click="model = false"
          >
            {{ el.title }}
          </NuxtLink>
          <span class="text-[12px] h-[3em] whitespace-normal line-clamp-2">
            {{ el.description }}
          </span>
          <div v-if="el.salePrice" class="flex gap-[5px] items-center">
            <span class="font-[600]">
              {{ currencyFormat(el.salePrice, Currency.USD, Locales.EN) }}
            </span>
            <span class="text-[12px] line-through">
              {{ currencyFormat(el.regularPrice, Currency.USD, Locales.EN) }}
            </span>
          </div>
          <div class="font-[600]" v-else>
            {{ currencyFormat(el.regularPrice, Currency.USD, Locales.EN) }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.image {
  @apply w-[60px];
}
.active {
  @apply text-dark-gray dark:text-fa-white;
}
</style>
