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
const { data: user } = await useFetch<UserDto>("/api/user/one", {
  method: "GET",
  params: {
    email: tempUser?.email,
  },
  pick: ["name", "email", "image"],
});

// meta
definePageMeta({
  name: eng.breadcrumbs.profile,
});

useHead({
  title: tempUser.name,
});
// hooks
</script>

<template>
  <header>
    <h1 class="page-title">{{ eng.breadcrumbs.profile }}</h1>
    <DashboardBreadcrumbs :links="links" />
  </header>
  <main class="content">
    <DashboardProfileInfo
      v-if="tempUser.isRegistered"
      :user="{ ...tempUser, image: user?.image }"
    />
    <DashboardProfileInfo v-else :user="tempUser" />
  </main>
</template>
