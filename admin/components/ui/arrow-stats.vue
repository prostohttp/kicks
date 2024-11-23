<script lang="ts" setup>
// define
const { value } = defineProps<{
    value: number;
}>();
</script>

<template>
    <div class="flex gap-[8px] items-center">
        <UIcon
            name="i-ic-sharp-arrow-upward"
            class="text-yellow text-[16px]"
            dynamic
            v-if="value > 0"
        />
        <UIcon
            name="i-ic-sharp-arrow-downward"
            class="text-dark-gray dark:text-fa-white text-[16px]"
            dynamic
            v-else
        />
        <span class="text-dark-gray dark:text-fa-white">
            {{ value }}
        </span>
    </div>
</template>
