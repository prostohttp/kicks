<script lang="ts" setup>
import type { UserDto } from "~/server/dto/user.dto";
import { eng } from "~/lang/eng";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

// vars
const router = useRouter();
const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(fullPath));
const { data } = useAuth();
const tempUser = data.value?.user as UserDto;

// handlers

// meta
definePageMeta({
  name: eng.breadcrumbs.profile,
});

useHead({
  title: tempUser.name,
});
</script>

<template>
  <header>
    <h1 class="page-title">{{ eng.breadcrumbs.profile }}</h1>
    <DashboardBreadcrumbs :links="links" />
  </header>
  <main class="content">
    <div class="flex lg:flex-row flex-col lg:gap-[35px] gap-[20px]">
      <DashboardProfileInfoRegistered v-if="tempUser?.isRegistered" />
      <DashboardProfileInfoUnregistered v-else />
    </div>
  </main>
</template>
