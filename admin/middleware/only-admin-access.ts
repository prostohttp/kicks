import { useIsAdmin } from "~/composables/is-admin";
export default defineNuxtRouteMiddleware(() => {
    const isAdmin = useIsAdmin();
    if (!isAdmin) {
        return navigateTo("/dashboard", { redirectCode: 403 });
    }
});
