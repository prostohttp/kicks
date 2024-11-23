import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthDataStore = defineStore("authData", () => {
    // vars
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const terms = ref(true);
    const keepLogged = ref(true);

    return {
        name,
        email,
        password,
        terms,
        keepLogged,
    };
});
