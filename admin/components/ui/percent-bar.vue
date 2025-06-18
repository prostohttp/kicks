<script lang="ts" setup>
// define
const { percent, value } = defineProps<{
    percent: number;
    value: number;
}>();
</script>

<template>
    <div class="flex gap-[8px] items-center">
        <UMeter
            :ui="{
                wrapper: 'w-[52px] h-[4px]',
                meter: {
                    background: 'bg-grey',
                    rounded: 'rounded-[8px]',
                    color: 'text-yellow',
                },
            }"
            :value="percent"
        />
        <span>{{ value }}</span>
    </div>
</template>
