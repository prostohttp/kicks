<script lang="ts" setup>
import { locale } from "~/lang/locale";
import { type BreadcrumbItem } from "~/types/ui/ui.types";

// store
const settingsDataStore = useSettingsDataStore();
await useAsyncData("asyncSettings", () => settingsDataStore.getSettings());
const { settings } = storeToRefs(settingsDataStore);

// vars
const router = useRouter();
const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(
  breadcrumbsArrayFactory(
    fullPath,
    locale[useSettingsDataStore().locale].settings,
    fullPath,
  ),
);
const items = [
  {
    slot: "general",
    icon: "i-heroicons-adjustments-vertical-16-solid",
    label: locale[useSettingsDataStore().locale].general,
  },
  {
    slot: "english",
    icon: "i-material-symbols-language",
    label: locale[useSettingsDataStore().locale].english,
  },
  {
    slot: "russian",
    icon: "i-material-symbols-language",
    label: locale[useSettingsDataStore().locale].russian,
  },
];

// meta
useHeadSafe({
  title: locale[useSettingsDataStore().locale].settings,
});

// hooks
</script>

<template>
  <DashboardBreadcrumbs
    :links="links"
    :title="locale[useSettingsDataStore().locale].settings"
  />
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
