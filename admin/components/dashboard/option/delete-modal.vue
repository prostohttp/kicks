<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { IOption } from "~/pages/dashboard/options/index.vue";

// define
const emit = defineEmits(["delete", "close"]);
const { options } = defineProps<{
  options: IOption[];
}>();

// vars
const toast = useToast();

// handlers
const getIdsHelper = (options: IOption[]): string[] => {
  return options.map((option) => option.id);
};

const deleteOption = async () => {
  try {
    await $fetch("/api/option/remove", {
      method: "DELETE",
      body: {
        ids: options ? getIdsHelper(options) : [],
      },
    });
    toast.add({
      title: locale["en"].successDeleteMessage,
      color: "green",
    });
    emit("delete");
  } catch (_error) {
    toast.add({
      title: locale["en"].somethingWentWrong,
      color: "red",
    });
  }
};
</script>

<template>
  <UModal :transition="false" class="bg-fa-white opacity-100" prevent-close>
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
            {{ locale["en"].deleteOption }}
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
        <p class="dark:text-fa-white">
          {{ locale["en"].deleteOptionText }}
        </p>
        <div class="flex gap-[10px] mt-auto justify-end">
          <UButton
            class="bg-dark-gray dark:bg-grey dark:text-dark-gray dark:hover:bg-grey dark:hover:text-dark-gray hover:bg-dark-bg uppercase"
            @click="$emit('close')"
          >
            {{ locale["en"].cancel }}
          </UButton>
          <UButton
            @click="deleteOption"
            class="bg-danger hover:bg-danger uppercase dark:bg-danger dark:text-fa-white dark:hover:bg-danger dark:hover:text-fa-white"
          >
            {{ locale["en"].deleteOption }}
          </UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>
