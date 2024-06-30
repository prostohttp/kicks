<script lang="ts" setup>
import { eng } from "~/lang/eng";

// define
const { userId } = defineProps<{
  userId: string;
}>();
defineEmits(["close"]);

// store

// vars
const formFieldsData = [
  {
    label: eng.userName,
    name: "name",
    placeholder: eng.userName,
    icon: "i-heroicons-user-circle-16-solid",
  },
  {
    label: eng.email,
    name: "email",
    placeholder: eng.email,
    icon: "i-heroicons-envelope",
  },
  {
    label: eng.role,
    name: "role",
    placeholder: eng.role,
    icon: "i-heroicons-shield-exclamation-20-solid",
    type: "select",
  },
];
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
            {{ eng.editProfile }}
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
      <DashboardUserEditForm
        :userId="userId"
        :data="formFieldsData"
        @close="$emit('close')"
      />
    </UCard>
  </UModal>
</template>
