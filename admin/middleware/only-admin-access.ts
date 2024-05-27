import { useIsAdmin } from "~/composables/is-admin";
export default defineNuxtRouteMiddleware((_to, _from) => {
  const isAdmin = useIsAdmin();
  if (!isAdmin) {
    return navigateTo("/dashboard", { redirectCode: 403 });
  }
});