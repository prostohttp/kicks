<script lang="ts" setup>
import { DashboardBrandEditModal } from "#components";
import type { BrandDto } from "~/server/api/brand/dto/brand.dto";
import { addQuery } from "~/utils/add-query";

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
        class="flex flex-col gap-[15px] justify-center text-center bg-fa-white dark:bg-opacity-90 rounded-[16px] p-[16px] cursor-pointer"
        @click="openEditBrandModal(brand._id)"
    >
        <div
            class="p-[5px] rounded-[8px] overflow-hidden flex items-center justify-center basis-[80%]"
        >
            <NuxtImg
                v-if="brand.image"
                :alt="brand.title"
                :src="`/${brand.image}`"
                class="rounded-[8px] w-[50%] md:w-full"
                fit="inside"
                placeholder
                width="200"
            />
            <NuxtImg
                v-else
                :alt="brand.title"
                class="rounded-[8px] w-[50%] md:w-[80px]"
                fit="inside"
                placeholder
                src="/no-image.svg"
                width="100"
            />
        </div>
        <h3 class="text-dark-gray mt-auto">
            {{ brand.title }}
        </h3>
    </NuxtLink>
</template>
