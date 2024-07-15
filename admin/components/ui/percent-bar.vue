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
      :value="percent"
      :ui="{
        wrapper: 'w-[52px] h-[4px]',
        meter: {
          background: 'bg-grey',
          rounded: 'rounded-[8px]',
          color: 'text-yellow',
        },
      }"
    />
    <span>{{ value }}</span>
  </div>
</template>
