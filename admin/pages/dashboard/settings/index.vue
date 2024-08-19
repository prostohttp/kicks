<script lang="ts" setup>
import { locale } from "~/lang/locale";
import { type BreadcrumbItem } from "~/types/ui/ui.types";
import { SettingsLocale } from "~/types/ui/ui.types";
import { validate } from "./validator";
import type { FormErrorEvent } from "#ui/types";

// store
const settingsDataStore = useSettingsDataStore();
await useAsyncData(() => settingsDataStore.getSettings());
const { settings } = storeToRefs(settingsDataStore);

// vars
const router = useRouter();
const isAdmin = useIsAdmin();
const toast = useToast();
const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(
  breadcrumbsArrayFactory(
    fullPath,
    locale[settingsDataStore.locale].settings,
    fullPath,
  ),
);
const items = [
  {
    slot: "general",
    icon: "i-heroicons-adjustments-vertical-16-solid",
    label: locale[settingsDataStore.locale].general,
  },
  {
    slot: "english",
    icon: "i-material-symbols-language",
    label: locale[settingsDataStore.locale].english,
  },
  {
    slot: "russian",
    icon: "i-material-symbols-language",
    label: locale[settingsDataStore.locale].russian,
  },
];
const isValidForm = ref(true);
const isLocaleChanged = ref(false);

// meta
useHead({
  title: locale[settingsDataStore.locale].settings,
});

const onSubmitHandler = async () => {
  try {
    await $fetch("/api/settings/edit", {
      method: "PUT",
      body: settings.value,
    });
    isValidForm.value = true;

    await settingsDataStore.getLocale();
    // FIXME: Другой вариант, без перезагрузки приложения
    if (isLocaleChanged.value) {
      reloadNuxtApp({ ttl: 1000 });
      isLocaleChanged.value = false;
    }
    toast.add({
      title: locale[settingsDataStore.locale].successEdit,
      color: "green",
    });
  } catch (error: any) {
    toast.add({ title: error.message, color: "red" });
  }
};
const onSubmit = useThrottleFn(onSubmitHandler, 3000);

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));

async function onError(event: FormErrorEvent) {
  if (event.errors.length) {
    isValidForm.value = false;
  } else {
    isValidForm.value = true;
  }
}

// hooks
watch(
  () => settings.value?.localeDashboard.value,
  (newValue, oldValue) => {
    isLocaleChanged.value = true;
  },
);
</script>

<template>
  <DashboardBreadcrumbs
    :links="links"
    :title="locale[settingsDataStore.locale].settings"
  />
  <main
    class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
  >
    <UForm
      :validate="validate"
      @submit="protectedSubmitHandler"
      @error="onError"
      class="flex flex-col lg:gap-[35px] gap-[20px]"
      :state="settings!"
    >
      <div
        v-if="!isValidForm"
        class="bg-dark-gray dark:bg-yellow text-fa-white dark:text-dark-gray w-full text-center py-[5px] rounded-[8px]"
      >
        {{ locale[settingsDataStore.locale].error.checkRequiredFields }}
      </div>
      <UTabs :items="items" class="w-full">
        <template #general>
          <DashboardSettingsForm />
        </template>
        <template #english>
          <DashboardSettingsLocaleForm :lang="SettingsLocale.en" />
        </template>
        <template #russian>
          <DashboardSettingsLocaleForm :lang="SettingsLocale.ru" />
        </template>
      </UTabs>
      <div>
        <UButton type="submit" class="dark-button my-[10px]">
          {{ locale[settingsDataStore.locale].save }}
        </UButton>
      </div>
    </UForm>
  </main>
</template>
