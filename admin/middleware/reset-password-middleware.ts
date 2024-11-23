export default defineNuxtRouteMiddleware((to) => {
    if (!to.query.token || !to.query.timestamp) {
        return navigateTo("/forgot", { redirectCode: 403 });
    }
});
