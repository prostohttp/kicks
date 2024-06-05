<script lang="ts" setup>
import { Constants } from "~/constants";
import { eng } from "~/lang/eng";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

// store
const userDataStore = useUserDataStore();
const { allUsers: data } = storeToRefs(userDataStore);

// vars
const toast = useToast();
const router = useRouter();
const page = useRoute().query.page as never as number;
const path = router.currentRoute.value.path;

const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(path));

// handlers
await userDataStore.getAllUsers(page);
const activePage = ref(data.value?.activePage || 1);

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
  name: eng.breadcrumbs.users,
});

useHead({
  title: eng.allUsers,
});

// Hooks
watch(activePage, async (newValue) => {
  router.push({ query: { page: newValue } });
  await userDataStore.getAllUsers(newValue!);
});

onMounted(() => {
  if (activePage.value) {
    userDataStore.getAllUsers(activePage.value);
  }
});
</script>

<template>
  <DashboardBreadcrumbs :links="links" :title="eng.breadcrumbs.users" />
  <main class="flex flex-col">
    <UiEmpty v-if="!data?.allItems" />
    <div
      class="grid 2xl:grid-cols-3 xl:grid-cols-2 sm:grid-cols-1 gap-[14px]"
      v-else
    >
      <DashboardUserCard
        v-for="user in data?.users"
        :key="user._id"
        :user="user"
        @deletePerson="deletePerson"
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
