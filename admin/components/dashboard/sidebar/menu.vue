<script lang="ts" setup>
import { Constants } from "~/constants";
import { eng } from "~/lang/eng";

// vars
const isAdmin = useIsAdmin();
const menuItems = [
  {
    to: "/dashboard",
    title: eng.dashboard,
    icon: "i-heroicons-squares-plus",
  },
  {
    to: "/dashboard/products?page=1",
    title: eng.allProducts,
    icon: "i-heroicons-list-bullet",
  },
  {
    to: "/dashboard/orders?page=1",
    title: eng.allOrders,
    icon: "i-heroicons-clipboard-document-list",
  },
  {
    to: "/dashboard/brands?page=1",
    title: eng.allBrands,
    icon: "i-heroicons-user-group",
  },
  {
    to: "/dashboard/articles?page=1",
    title: eng.allArticles,
    icon: "i-heroicons-newspaper",
  },
  {
    to: "/dashboard/options?page=1",
    title: eng.allOptions,
    icon: "i-heroicons-chart-bar",
  },
  {
    to: "/dashboard/users?page=1",
    title: eng.allUsers,
    icon: "i-heroicons-finger-print",
    protected: !isAdmin,
  },
  {
    to: "/dashboard/banners?page=1",
    title: eng.allBanners,
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
