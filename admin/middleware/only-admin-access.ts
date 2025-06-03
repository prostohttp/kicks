import { checkIsAdmin } from "~/utils/check-is-admin";
export default defineNuxtRouteMiddleware(() => {
    const isAdmin = isAdmin();
    if (!isAdmin) {
        return navigateTo("/dashboard", { redirectCode: 403 });
    }
});
