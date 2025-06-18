<script lang="ts" setup>
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

// store
const userDataStore = useUserDataStore();
const settingsDataStore = useSettingsDataStore();
await useAsyncData(() =>
    userDataStore.getAllUsers(Number(useRoute().query.page)),
);
const { allUsers: data } = storeToRefs(userDataStore);

// vars
const toast = useToast();
const router = useRouter();
const route = useRoute();
const path = router.currentRoute.value.path;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(path));
const activePage = ref(data.value?.activePage || 1);

// handlers
const deletePerson = async (id: string) => {
    try {
        await $fetch("/api/user/remove", {
            method: "DELETE",
            body: {
                id,
            },
        });
        await userDataStore.getAllUsers(activePage.value!);
    } catch (error: any) {
        toast.add({ title: error.message });
    }
};

// meta
definePageMeta({
    middleware: ["only-admin-access"],
});

useHead({
    title: locale[settingsDataStore.locale].allUsers,
});

// Hooks
watch(
    () => route.query,
    (newValue) => {
        if (!newValue.page) {
            activePage.value = 1;
        }
    },
);

watch(activePage, async (newValue) => {
    router.push({ query: { ...route.query, page: newValue || 1 } });
    await userDataStore.getAllUsers(newValue!);
});
</script>

<template>
    <DashboardBreadcrumbs
        :links="links"
        :title="locale[settingsDataStore.locale].breadcrumbs.users"
    />
    <main class="flex flex-col">
        <LazyUiEmpty v-if="!data?.allItems" />
        <div v-else class="grid xl:grid-cols-3 md:grid-cols-1 gap-[14px]">
            <DashboardUserCard
                v-for="user in data?.users"
                :key="user._id"
                :user="user"
                @deletePerson="deletePerson"
            />
        </div>
    </main>
    <LazyUiPagination
        v-if="data?.pagesInPagination"
        v-model="activePage"
        :all-items="data?.allItems"
        :element-in-page="Constants.PER_PAGE_USERS"
    />
</template>
