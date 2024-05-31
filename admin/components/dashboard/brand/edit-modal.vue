<script lang="ts" setup>
import { eng } from "~/lang/eng";

// define
const { brandId } = defineProps<{
  brandId: string;
}>();
const emit = defineEmits(["edit", "close"]);
</script>

<template>
  <UModal prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ eng.editBrand }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="$emit('close')"
          />
        </div>
      </template>

      <div class="flex flex-col gap-[20px]">
        <div class="flex gap-[10px] mt-auto justify-end">
          <UButton
            class="bg-dark-gray dark:bg-grey dark:text-dark-gray dark:hover:bg-grey dark:hover:text-dark-gray hover:bg-dark-bg uppercase"
            @click="$emit('close')"
          >
            {{ eng.cancel }}
          </UButton>
          <UButton
            @click="$emit('edit')"
            class="bg-danger hover:bg-danger uppercase dark:bg-danger dark:text-fa-white dark:hover:bg-danger dark:hover:text-fa-white"
          >
            {{ eng.save }}
          </UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>
