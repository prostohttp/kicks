import type { UserDto } from "~/server/dto/user.dto";

interface UsersPayload {
    users: UserDto[];
    pagesInPagination?: number;
    allItems: number;
    activePage?: number;
}

export const useUserDataStore = defineStore("userData", () => {
    // Vars
    const { data } = useAuth();
    const user = data.value?.user as UserDto;
    const allUsers: Ref<UsersPayload | undefined> = ref();

    const savedUser: Ref<UserDto | undefined> = ref();
    const userById: Ref<UserDto | undefined> = ref();

    // Handlers
    const getUser = async () => {
        if (user.isRegistered) {
            try {
                const foundedUser = await $fetch<UserDto>("/api/user/one", {
                    method: "GET",
                    query: {
                        email: user?.email,
                    },
                });
                savedUser.value = {
                    ...foundedUser,
                    isRegistered: true,
                };
            } catch (error) {
                throw createError({
                    statusMessage: "User not found.",
                });
            }
        } else {
            savedUser.value = user;
        }
        return true;
    };

    const getAllUsers = async (page: number) => {
        try {
            allUsers.value = await $fetch<UsersPayload>("/api/user/all", {
                method: "GET",
                query: {
                    page: page || 1,
                },
            });
        } catch (error: any) {
            throw createError({
                statusMessage: error.message,
            });
        }
        return true;
    };

    const getUserById = async (id: string) => {
        try {
            userById.value = await $fetch("/api/user/one", {
                method: "GET",
                query: {
                    id,
                },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
    };

    return {
        allUsers,
        savedUser,
        userById,
        getUser,
        getAllUsers,
        getUserById,
    };
});
