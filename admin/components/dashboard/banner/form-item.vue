<script lang="ts" setup>
import { eng } from "~/lang/eng";

// define
const { index } = defineProps<{
  index: number;
}>();

// vars
const dropZoneRef = ref<HTMLInputElement | undefined>();

// store
const bannerDataStore = useBannerDataStore();
const { banner } = storeToRefs(bannerDataStore);

// handlers

const deleteImageHandler = () => {};

const uploadImage = (e: Event) => {};
</script>

<template>
  <div class="flex flex-col gap-[30px]">
    <UiImageUpload
      :add-new="true"
      v-model:image="banner.banners[index].image"
      alt="New Article"
      v-model:drop-zone-ref="dropZoneRef"
      @delete="deleteImageHandler"
      @change="uploadImage($event)"
    />
    <UFormGroup
      name="heading"
      :label="eng.heading"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[10px]',
        },
      }"
    >
      <UInput
        :placeholder="eng.heading"
        inputClass="no-left-icon"
        v-model="banner.banners[index].heading"
      />
    </UFormGroup>
    <UFormGroup
      name="description"
      :label="eng.description"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[10px]',
        },
      }"
    >
      <UTextarea
        :placeholder="eng.description"
        inputClass="no-left-icon"
        class="textarea"
        v-model="banner.banners[index].description"
      />
    </UFormGroup>
    <UFormGroup
      name="url"
      :label="eng.url"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[10px]',
        },
      }"
    >
      <UInput
        :placeholder="eng.url"
        inputClass="no-left-icon"
        v-model="banner.banners[index].url"
      />
    </UFormGroup>
    <UFormGroup
      name="sort"
      :label="eng.sort"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[10px]',
        },
      }"
    >
      <UInput
        :placeholder="eng.sort"
        inputClass="no-left-icon"
        v-model="banner.banners[index].sort"
        type="number"
        min="1"
      />
    </UFormGroup>
  </div>
</template>
