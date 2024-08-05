<script lang="ts" setup>
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";

// vars
const isAdmin = useIsAdmin();
const menuItems = [
  {
    to: "/dashboard",
    title: locale[useSettingsDataStore().locale].dashboard,
    icon: "i-heroicons-squares-plus",
  },
  {
    to: "/dashboard/products?page=1",
    title: locale[useSettingsDataStore().locale].allProducts,
    icon: "i-heroicons-list-bullet",
  },
  {
    to: "/dashboard/orders?page=1",
    title: locale[useSettingsDataStore().locale].allOrders,
    icon: "i-heroicons-clipboard-document-list",
  },
  {
    to: "/dashboard/brands?page=1",
    title: locale[useSettingsDataStore().locale].allBrands,
    icon: "i-heroicons-user-group",
  },
  {
    to: "/dashboard/articles?page=1",
    title: locale[useSettingsDataStore().locale].allArticles,
    icon: "i-heroicons-newspaper",
  },
  {
    to: "/dashboard/options?page=1",
    title: locale[useSettingsDataStore().locale].allOptions,
    icon: "i-heroicons-chart-bar",
  },
  {
    to: "/dashboard/users?page=1",
    title: locale[useSettingsDataStore().locale].allUsers,
    icon: "i-heroicons-finger-print",
    protected: !isAdmin,
  },
  {
    to: "/dashboard/banners?page=1",
    title: locale[useSettingsDataStore().locale].allBanners,
    icon: "i-material-symbols-add-photo-alternate-outline",
  },
];
const isOpenMobileSidebar = inject(Constants.PROVIDE_IS_OPEN_MOBILE_SIDEBAR);
</script>

<template>
  <ul class="flex flex-col gap-[10px]">
    <DashboardSidebarMenuItem
      v-for="item in menuItems"
      :key="item.to"
      :to="item.to"
      :title="item.title"
      :icon="item.icon"
      :protected="item.protected"
      @click="isOpenMobileSidebar = false"
    />
  </ul>
</template>
