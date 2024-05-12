<script lang="ts" setup>
const isOn = ref(false);
</script>

<template>
  <div class="flex items-center">
    <UIcon
      :name="isOn ? 'i-heroicons-bell-alert-solid' : 'i-heroicons-bell'"
      class="cursor-pointer scale-[1.7]"
      :class="isOn ? 'bg-blue' : 'bg-dark-gray'"
      @click="isOn = !isOn"
    />
  </div>
</template>
