<script lang="ts" setup>
import { DashboardProductDeleteModal } from "#components";
import { eng } from "~/lang/eng";
import type { ProductDto } from "~/server/api/product/dto/product.dto";
import { Currency, Locales } from "~/types/ui/ui.types";

// define
const { product, categories, sales } = defineProps<{
  product: ProductDto;
  categories: string[];
  sales: number;
}>();
const emit = defineEmits(["delete-product"]);

// store

// vars
const modal = useModal();

// handlers
const openDeleteProductModal = () => {
  modal.open(DashboardProductDeleteModal, {
    onClose() {
      modal.close();
    },
    onDelete() {
      emit("delete-product", product._id);
      modal.close();
    },
  });
};
// hooks
</script>

<template>
  <div
    class="bg-white rounded-[16px] p-[16px] dark:bg-dark-bg dark:text-fa-white flex flex-col gap-[15px] open-sans text-dark-gray sm:justify-between"
  >
    <div
      class="flex items-center sm:items-start sm:flex-row flex-col gap-[15px] relative"
    >
      <div
        class="sm:min-w-[90px] sm:max-w-[90px] sm:w-[60%] w-full rounded-[8px] p-[15px] bg-fa-white dark:bg-dark-gray flex items-center justify-center aspect-square overflow-hidden"
      >
        <template v-if="product.image">
          <img
            :src="`/${product.image}`"
            :alt="product.title"
            class="sm:max-w-[200px] max-w-[300px] w-full"
          />
        </template>
        <template v-else>
          <img
            src="~/public/no-image.svg"
            :alt="eng.noImage"
            class="max-w-[200px]"
          />
        </template>
      </div>
      <div class="flex flex-col items-center sm:items-start break-all">
        <h3 class="text-[16px] leading-[20px] sm:gap-0 gap-[10px] mb-[5px]">
          {{ product.title }}
        </h3>
        <span
          class="text-opacity-60 text-[14px] text-black dark:text-fa-white dark:opacity-40 mb-[10px]"
        >
          {{ categories.join(", ") }}
        </span>
        <strong
          class="font-[600] sm:mt-auto mt-[15px] uppercase flex gap-[10px]"
        >
          <template v-if="product.salePrice">
            <span>{{
              currencyFormat(product.salePrice, Currency.USD, Locales.EN)
            }}</span>
            <span
              class="line-through text-[#919090] font-normal text-[13px] leading-[23px]"
            >
              {{
                currencyFormat(product.regularPrice, Currency.USD, Locales.EN)
              }}
            </span>
          </template>
          <template v-else>
            {{ currencyFormat(product.regularPrice, Currency.USD, Locales.EN) }}
          </template>
        </strong>
      </div>
      <div class="ml-auto sm:static absolute top-4 right-4 min-w-[35px]">
        <UPopover
          :popper="{ placement: 'bottom-end', offsetDistance: 10 }"
          :ui="{
            rounded: 'rounded-[8px]',
            ring: 'ring-[#e7e7e3] ring-1',
            shadow: 'shadow-none',
            width: 'md:w-auto w-[calc(100%-20px)]',
            position: 'right-[10px] sm:right-auto',
          }"
        >
          <UButton
            trailing-icon="i-heroicons-ellipsis-horizontal-solid"
            class="bg-[#efefef] dark:bg-[#efefef] text-dark-gray hover:bg-dark-gray dark:hover:bg-dark-gray dark:hover:text-fa-white hover:text-fa-white py-[3px]"
          />
          <template #panel>
            <ul class="p-4 flex flex-col gap-[10px]">
              <NuxtLink
                active-class="active"
                :to="`/dashboard/products/${product._id}`"
                class="cursor-pointer"
              >
                {{ eng.editProduct }}
              </NuxtLink>
              <NuxtLink @click="openDeleteProductModal" class="cursor-pointer">
                {{ eng.deleteProduct }}
              </NuxtLink>
            </ul>
          </template>
        </UPopover>
      </div>
    </div>
    <div class="flex flex-col gap-[5px]">
      <strong class="text-[16px]">{{ eng.summary }}</strong>
      <span
        class="text-[14px] font-[200] sm:truncate sm:h-auto sm:overflow-auto h-[40px] overflow-hidden opacity-60"
      >
        {{ product.description }}
      </span>
    </div>
    <div class="border rounded-[8px] border-[#c1c1c1] p-[16px] text-[14px]">
      <div class="flex justify-between pb-[8px] border-b border-[#c1c1c1]">
        <span>{{ eng.sales }}</span>
        <UiArrowStats :value="sales" />
      </div>
      <div class="flex justify-between pt-[8px]">
        <span>{{ eng.remainingProducts }}</span>
        <UiPercentBar
          :percent="percentForStats(product.quantity)"
          :value="product.quantity"
        />
      </div>
    </div>
  </div>
</template>
