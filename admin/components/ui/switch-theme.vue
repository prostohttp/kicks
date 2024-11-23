<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
    get() {
        // system | light | dark
        return colorMode.value === "system";
    },
    set() {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    },
});
</script>
<template>
    <ClientOnly>
        <UButton
            :icon="
                isDark
                    ? 'i-heroicons-moon-20-solid'
                    : 'i-heroicons-sun-20-solid'
            "
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
            class="absolute md:right-2 top-[35px] md:top-2 left-[70px] md:left-auto"
        />
        <template #fallback>
            <div class="w-8 h-8 absolute" />
        </template>
    </ClientOnly>
</template>
