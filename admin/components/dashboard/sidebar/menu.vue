<script lang="ts" setup>
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";

// store
const settingsDataStore = useSettingsDataStore();
const { locale: storeLocale } = storeToRefs(settingsDataStore);

// vars
const isAdmin = checkIsAdmin();
const menuItems = reactive([
    {
        to: "/dashboard",
        title: locale[storeLocale.value].dashboard,
        icon: "i-heroicons-squares-plus",
    },
    {
        to: "/dashboard/products?page=1",
        title: locale[storeLocale.value].allProducts,
        icon: "i-heroicons-list-bullet",
    },
    {
        to: "/dashboard/orders?page=1",
        title: locale[storeLocale.value].allOrders,
        icon: "i-heroicons-clipboard-document-list",
    },
    {
        to: "/dashboard/brands?page=1",
        title: locale[storeLocale.value].allBrands,
        icon: "i-heroicons-user-group",
    },
    {
        to: "/dashboard/articles?page=1",
        title: locale[storeLocale.value].allArticles,
        icon: "i-heroicons-newspaper",
    },
    {
        to: "/dashboard/options?page=1",
        title: locale[storeLocale.value].allOptions,
        icon: "i-heroicons-chart-bar",
    },
    {
        to: "/dashboard/users?page=1",
        title: locale[storeLocale.value].allUsers,
        icon: "i-heroicons-finger-print",
        protected: !isAdmin,
    },
    {
        to: "/dashboard/banners?page=1",
        title: locale[storeLocale.value].allBanners,
        icon: "i-material-symbols-add-photo-alternate-outline",
    },
]);
const isOpenMobileSidebar = inject(Constants.PROVIDE_IS_OPEN_MOBILE_SIDEBAR);

// hooks
watch(
    () => locale[storeLocale.value],
    (newValue) => {
        menuItems[0].title = newValue.dashboard;
        menuItems[1].title = newValue.allProducts;
        menuItems[2].title = newValue.allOrders;
        menuItems[3].title = newValue.allBrands;
        menuItems[4].title = newValue.allArticles;
        menuItems[5].title = newValue.allOptions;
        menuItems[6].title = newValue.allUsers;
        menuItems[7].title = newValue.allBanners;
    },
);
</script>

<template>
    <ul class="flex flex-col gap-[10px]">
        <DashboardSidebarMenuItem
            v-for="item in menuItems"
            :key="item.to"
            :icon="item.icon"
            :protected="item.protected"
            :title="item.title"
            :to="item.to"
            @click="isOpenMobileSidebar = false"
        />
    </ul>
</template>
