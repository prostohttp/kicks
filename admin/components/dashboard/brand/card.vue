<script lang="ts" setup>
import { DashboardBrandEditModal } from "#components";
import type { BrandDto } from "~/server/api/brand/dto/brand.dto";

// define
const { brand } = defineProps<{
  brand: BrandDto;
}>();

// vars
const modal = useModal();
const route = useRoute();

// handlers
const openEditBrandModal = (brandId: string) => {
  modal.open(DashboardBrandEditModal, {
    brandId,
    onClose() {
      removeQuery("brandEdit");
      modal.close();
    },
  });
};

// hooks
onMounted(() => {
  if (route.query.brandEdit) {
    openEditBrandModal(route.query.brandEdit.toString());
  }
});
</script>
<template>
  <NuxtLink
    :to="addQuery('brandEdit', brand._id)"
    @click="openEditBrandModal(brand._id)"
    class="flex flex-col gap-[15px] justify-center text-center bg-fa-white dark:bg-dark-bg rounded-[16px] p-[16px] cursor-pointer"
  >
    <div
      class="p-[5px] rounded-[8px] overflow-hidden flex items-center justify-center basis-[80%]"
    >
      <img
        :src="`/${brand.image}`"
        :alt="brand.title"
        v-if="brand.image"
        class="rounded-[8px] dark:brightness-0 dark:invert-[0.5] w-[50%] md:w-full"
      />
      <img
        src="~/public/no-image.svg"
        :alt="brand.title"
        v-else
        class="rounded-[8px] w-[50%] md:w-[80px] dark:brightness-0 dark:invert-[0.5]"
      />
    </div>
    <h3 class="text-dark-gray dark:text-fa-white mt-auto">
      {{ brand.title }}
    </h3>
  </NuxtLink>
</template>
