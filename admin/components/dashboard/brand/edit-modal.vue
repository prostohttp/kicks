<script lang="ts" setup>
import { eng } from "~/lang/eng";

// define
const { brandId } = defineProps<{
  brandId: string;
}>();
const emit = defineEmits(["close"]);

// vars
const { data: brand } = await useFetch("/api/brand/one", {
  method: "GET",
  query: {
    id: brandId,
  },
});
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

      <DashboardBrandEditForm
        @close="$emit('close')"
        :brandId="brandId"
        v-if="brand"
      />
      <div class="dark:text-fa-white" v-else>
        <h2>{{ eng.empty }}</h2>
      </div>
    </UCard>
  </UModal>
</template>
