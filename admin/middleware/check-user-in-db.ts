import { useUserDataStore } from "~/stores/user-data";

//TODO: Не корректно работает при нахождении на странице при перезагрузке страницы, при переходе на эту страницу с других отрабатывает.
export default defineNuxtRouteMiddleware(async () => {
    const { signOut } = useAuth();
    const userStore = useUserDataStore();
    await useAsyncData(() => userStore.getUser());
    const { savedUser } = storeToRefs(userStore);
    if (!savedUser.value) {
        console.log("User not found!");
        await signOut({ callbackUrl: "/" });
    }
});
