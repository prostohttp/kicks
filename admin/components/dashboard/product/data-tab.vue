<script lang="ts" setup>
import type { ModelRef } from "vue";
import { locale } from "~/lang/locale";
import type { FlatProductDto } from "~/server/api/product/dto/product.dto";

// define
const { isSaved } = defineProps<{
    isSaved?: boolean;
}>();
const state: ModelRef<FlatProductDto> = defineModel("state", {
    required: true,
    default: {} as FlatProductDto,
});

// store
const settingsDataStore = useSettingsDataStore();
</script>

<template>
    <div class="flex lg:flex-row flex-col-reverse justify-between mt-[40px]">
        <DashboardProductDataFields v-model:state="state" />
        <div
            class="lg:w-[32%] w-full flex flex-col gap-[20px] lg:mb-0 mb-[20px]"
        >
            <DashboardProductDataImage
                v-model:state="state"
                :isSaved="isSaved"
            />
            <div>
                <h3 class="font-[Rubik] font-[600] text-[20px] mb-[16px]">
                    {{ locale[settingsDataStore.locale].productPhotoGallery }}
                </h3>
                <DashboardProductDataImageGallery
                    v-model:state="state"
                    :isSaved="isSaved"
                />
            </div>
        </div>
    </div>
</template>
