<script lang="ts" setup>
import type { UserDto } from "~/server/dto/user.dto";
import { locale } from "~/lang/locale";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

// store
const settingsDataStore = useSettingsDataStore();

// vars
const router = useRouter();
const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(fullPath));
const { data } = useAuth();
const tempUser = data.value?.user as UserDto;

// meta
useHead({
    title: tempUser.name,
});
</script>

<template>
    <DashboardBreadcrumbs
        :links="links"
        :title="locale[settingsDataStore.locale].breadcrumbs.profile"
    />
    <main
        class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
    >
        <div class="flex lg:flex-row flex-col lg:gap-[35px] gap-[20px]">
            <LazyDashboardProfileInfoRegistered v-if="tempUser?.isRegistered" />
            <LazyDashboardProfileInfoUnregistered v-else />
        </div>
    </main>
</template>
