<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "light";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>
<template>
  <ClientOnly>
    <UButton
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="gray"
      variant="ghost"
      aria-label="Theme"
      @click="isDark = !isDark"
      class="absolute top-5 right-5"
    />
    <template #fallback>
      <div class="w-8 h-8 absolute" />
    </template>
  </ClientOnly>
</template>
