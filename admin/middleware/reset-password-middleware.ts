export default defineNuxtRouteMiddleware((to, _from) => {
	if (!to.query.token || !to.query.timestamp) {
		return navigateTo("/auth/forgot");
	}
});
