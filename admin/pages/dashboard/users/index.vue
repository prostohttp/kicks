<script lang="ts" setup>
import { Constants } from "~/constants";
import { eng } from "~/lang/eng";
import type { UserDto } from "~/server/dto/user.dto";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

// vars
const router = useRouter();
const page = useRoute().query.page;
const path = router.currentRoute.value.path;

const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(path));

// handlers
const { data } = await useFetch<{
  users: UserDto[];
  pagesInPagination?: number;
  allItems: number;
  activePage?: number;
}>("/api/user/all", {
  method: "GET",
  query: {
    page,
  },
});

const activePage = ref(data.value?.activePage);

// Meta
definePageMeta({
  middleware: ["only-admin-access"],
  name: eng.breadcrumbs.users,
});

useHead({
  title: eng.allUsers,
});

// Hooks
watch(activePage, async (newValue) => {
  router.push({ query: { page: newValue } });
  data.value = await $fetch("/api/user/all", {
    method: "GET",
    query: {
      page: newValue,
    },
  });
});
</script>

<template>
  <DashboardBreadcrumbs :links="links" :title="eng.breadcrumbs.users" />
  <main class="flex flex-col">
    <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[14px]">
      <DashboardUserCard
        v-for="user in data?.users"
        :key="user._id"
        :user="user"
      />
    </div>
    <UiPagination
      v-if="data?.pagesInPagination"
      v-model="activePage"
      :element-in-page="Constants.PER_PAGE_USERS"
      :allItems="data?.allItems"
    />
  </main>
</template>
