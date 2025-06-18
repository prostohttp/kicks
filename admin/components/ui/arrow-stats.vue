<script lang="ts" setup>
// define
const { value } = defineProps<{
    value: number;
}>();
</script>

<template>
    <div class="flex gap-[8px] items-center">
        <UIcon
            v-if="value > 0"
            class="text-yellow text-[16px]"
            dynamic
            name="i-ic-sharp-arrow-upward"
        />
        <UIcon
            v-else
            class="text-dark-gray dark:text-fa-white text-[16px]"
            dynamic
            name="i-ic-sharp-arrow-downward"
        />
        <span class="text-dark-gray dark:text-fa-white">
            {{ value }}
        </span>
    </div>
</template>
