<script lang="ts" setup>
import { eng } from "~/lang/eng";
import type { UserDto } from "~/server/dto/user.dto";

// defines
const { userId } = defineProps<{
  userId: string;
}>();

defineEmits(["close"]);

// handlers
const { data: user, pending } = await useFetch<UserDto>("/api/user/one", {
  method: "GET",
  query: {
    id: userId,
  },
});
</script>

<template>
  <UModal prevent-close>
    <UiSpinner v-if="pending" />
    <UCard
      v-else
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
      <div class="dark:text-fa-white text-dark-gray" v-if="user">
        <DashboardUserEditForm :user="user" />
      </div>
      <div v-else class="dark:text-fa-white">
        <h2>{{ eng.empty }}</h2>
      </div>
    </UCard>
  </UModal>
</template>
