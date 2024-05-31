<script lang="ts" setup>
import { DashboardBrandEditModal } from "#components";
import type { BrandDto } from "~/server/api/brand/dto/brand.dto";

// define
const { brand } = defineProps<{
  brand: BrandDto;
}>();

// vars
const modal = useModal();
const toast = useToast();
const route = useRoute();

// handlers
const openEditBrandModal = (brandId: string) => {
  modal.open(DashboardBrandEditModal, {
    brandId,
    onClose() {
      removeQuery("edit");
      modal.close();
    },
    onEdit() {
      modal.close();
    },
  });
};

// hooks
onMounted(() => {
  if (route.query.edit) {
    openEditBrandModal(route.query.edit.toString());
  }
});
</script>
<template>
  <NuxtLink
    :to="addQuery('edit', brand._id)"
    @click="openEditBrandModal(brand._id)"
    class="flex flex-col gap-[15px] justify-center text-center bg-fa-white dark:bg-dark-bg rounded-[16px] p-[16px] cursor-pointer"
  >
    <div
      class="p-[5px] rounded-[8px] overflow-hidden flex items-center justify-center"
    >
      <img
        :src="`/${brand.image}`"
        :alt="brand.title"
        v-if="brand.image"
        class="rounded-[8px]"
      />
      <img
        src="~/public/no-image.svg"
        :alt="brand.title"
        v-else
        class="w-[80px] rounded-[8px]"
      />
    </div>
    <h3 class="text-dark-gray dark:text-fa-white">
      {{ brand.title }}
    </h3>
  </NuxtLink>
</template>
