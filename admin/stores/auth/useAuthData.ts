export const useAuthDataStore = defineStore("authData", () => {
	// vars
	const firstName = ref("");
	const lastName = ref("");
	const email = ref("");
	const password = ref("");
	const terms = ref(true);
	const keepLogged = ref(true);

	return {
		firstName,
		lastName,
		email,
		password,
		terms,
		keepLogged,
	};
});
