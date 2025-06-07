import { checkIsAdmin } from "~/utils/check-is-admin";

export default defineNuxtRouteMiddleware(() => {
    const isAdmin = checkIsAdmin();
    if (!isAdmin) {
        return navigateTo("/dashboard", { redirectCode: 403 });
    }
});
