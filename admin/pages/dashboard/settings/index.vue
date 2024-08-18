<script lang="ts" setup>
import { locale } from "~/lang/locale";
import { type BreadcrumbItem } from "~/types/ui/ui.types";
import * as v from "valibot";
import type { FormSubmitEvent } from "#ui/types";
import validator from "./schema/index";
import type { CookieRef } from "#app";

// store
const settingsDataStore = useSettingsDataStore();
await useAsyncData(() => settingsDataStore.getSettings());
const { settings } = storeToRefs(settingsDataStore);

// vars
const router = useRouter();
const isAdmin = useIsAdmin();
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
const cookieLocale: CookieRef<"en" | "ru"> = useCookie("locale");
const schema = validator(cookieLocale.value);

// meta
useHead({
  title: locale[settingsDataStore.locale].settings,
});

// handlers
const onSubmitHandler = async (event: FormSubmitEvent<any>) => {};
const onSubmit = useThrottleFn(onSubmitHandler, 3000);

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));
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
      :schema="v.safeParser(schema)"
      @submit="protectedSubmitHandler"
      class="flex flex-col lg:gap-[35px] gap-[20px]"
      :state="settings!"
    >
      <UTabs :items="items" class="w-full">
        <template #general>
          <DashboardSettingsForm />
        </template>
        <template #english>
          <DashboardSettingsLocaleForm locale="en" />
        </template>
        <template #russian>
          <DashboardSettingsLocaleForm locale="ru" />
        </template>
      </UTabs>
      <div>
        <UButton type="submit" class="dark-button mt-[20px]">
          {{ locale[settingsDataStore.locale].save }}
        </UButton>
      </div>
    </UForm>
  </main>
</template>
