<script lang="ts" setup>
import { locale } from "~/lang/locale";
import { type BreadcrumbItem } from "~/types/ui/ui.types";
import { SettingsLocale } from "~/types/ui/ui.types";
import { validate } from "./validator";
import type { FormErrorEvent } from "#ui/types";

// store
const settingsDataStore = useSettingsDataStore();
await useAsyncData(() => settingsDataStore.getSettings());
const { settings, locale: storeLocale } = storeToRefs(settingsDataStore);

// vars
const router = useRouter();
const isAdmin = useIsAdmin();
const toast = useToast();
const fullPath = router.currentRoute.value.fullPath;
const title = computed(() => locale[storeLocale.value].settings);
const links: Ref<BreadcrumbItem[]> = ref(
  breadcrumbsArrayFactory(fullPath, title.value, fullPath),
);
const items = ref([
  {
    slot: "general",
    icon: "i-heroicons-adjustments-vertical-16-solid",
    label: locale[storeLocale.value].general,
  },
  {
    slot: "english",
    icon: "i-material-symbols-language",
    label: locale[storeLocale.value].english,
  },
  {
    slot: "russian",
    icon: "i-material-symbols-language",
    label: locale[storeLocale.value].russian,
  },
]);
const isValidForm = ref(true);
// TODO: Вариант с перезагрузкой приложения
// const isLocaleChanged = ref(false);

// handlers
const onSubmitHandler = async () => {
  try {
    await $fetch("/api/settings/edit", {
      method: "PUT",
      body: settings.value,
    });
    isValidForm.value = true;

    await settingsDataStore.getLocale();
    // TODO: Вариант с перезагрузкой приложения
    // if (isLocaleChanged.value) {
    //   reloadNuxtApp({ ttl: 1000 });
    //   isLocaleChanged.value = false;
    // } else {
    //   toast.add({
    //     title: locale[storeLocale].successEdit,
    //     color: "green",
    //   });
    // }

    toast.add({
      title: locale[storeLocale.value].successEdit,
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
// TODO: Вариант с перезагрузкой приложения
// watch(
//   () => settings.value?.localeDashboard.value,
//   (newValue, oldValue) => {
//     isLocaleChanged.value = true;
//   },
// );
watch(
  () => locale[storeLocale.value],
  (newValue) => {
    links.value = breadcrumbsArrayFactory(
      fullPath,
      newValue.settings,
      fullPath,
    );
    items.value[0].label = newValue.general;
    items.value[1].label = newValue.english;
    items.value[2].label = newValue.russian;
  },
);

// meta
useHead({
  title: title,
});
</script>

<template>
  <DashboardBreadcrumbs :links="links" :title="locale[storeLocale].settings" />
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
        {{ locale[storeLocale].error.checkRequiredFields }}
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
          {{ locale[storeLocale].save }}
        </UButton>
      </div>
    </UForm>
  </main>
</template>
