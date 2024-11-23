<script setup lang="ts">
// define
defineProps<{ title: string; fullscreen?: boolean }>();
const isOpen = defineModel<boolean>();
</script>

<template>
    <UModal v-model="isOpen" :fullscreen="fullscreen" prevent-close>
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
                        {{ title }}
                    </h3>
                    <UButton
                        color="gray"
                        variant="ghost"
                        icon="i-heroicons-x-mark-20-solid"
                        class="-my-1"
                        @click="isOpen = false"
                    />
                </div>
            </template>

            <div class="ui-modal">
                <slot />
            </div>
        </UCard>
    </UModal>
</template>
