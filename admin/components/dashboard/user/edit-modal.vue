<script lang="ts" setup>
import { locale } from "~/lang/locale";

// define
const { userId } = defineProps<{
    userId: string;
}>();
defineEmits(["close"]);

// store
const settingsDataStore = useSettingsDataStore();
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
                        {{ locale[settingsDataStore.locale].editProfile }}
                    </h3>
                    <UButton
                        class="-my-1"
                        color="gray"
                        icon="i-heroicons-x-mark-20-solid"
                        variant="ghost"
                        @click="$emit('close')"
                    />
                </div>
            </template>
            <DashboardUserEditForm :userId="userId" @close="$emit('close')" />
        </UCard>
    </UModal>
</template>
