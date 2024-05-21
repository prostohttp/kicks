import { defineStore } from "pinia";
import type { UserDto } from "~/server/dto/user.dto";

export const useUserDataStore = defineStore("userData", () => {
  // Vars
  const { data } = useAuth();
  const user = data.value?.user as UserDto;

  const savedUser: Ref<UserDto | undefined> = ref();

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
  };

  return {
    savedUser,
    getUser,
  };
});
