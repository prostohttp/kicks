<script lang="ts" setup>
import { locale } from "~/lang/locale";
import { Locales, type BreadcrumbItem } from "~/types/ui/ui.types";

// store
const settingsDataStore = useSettingsDataStore();
await useAsyncData("asyncSettings", () => settingsDataStore.getSettings());
const { settings } = storeToRefs(settingsDataStore);

// vars
const router = useRouter();
const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(
  breadcrumbsArrayFactory(fullPath, locale["en"].settings, fullPath),
);
const items = [
  {
    slot: "general",
    icon: "i-heroicons-adjustments-vertical-16-solid",
    label: locale["en"].general,
  },
  {
    slot: "english",
    icon: "i-material-symbols-language",
    label: locale["en"].english,
  },
  {
    slot: "russian",
    icon: "i-material-symbols-language",
    label: locale["en"].russian,
  },
];

// meta
useHeadSafe({
  title: locale["en"].settings,
});

// hooks
</script>

<template>
  <DashboardBreadcrumbs :links="links" :title="locale['en'].settings" />
  <main
    class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
  >
    <UForm
      :state="settings!"
      class="flex lg:flex-row flex-col lg:gap-[35px] gap-[20px]"
    >
      <UTabs :items="items" class="w-full">
        <template #general="item">
          <DashboardSettingsForm />
        </template>
        <template #english="item">
          <DashboardSettingsLocaleForm locale="en" />
        </template>
        <template #russian="item">
          <DashboardSettingsLocaleForm locale="ru" />
        </template>
      </UTabs>
    </UForm>
  </main>
</template>
