import { defineStore } from "pinia";
import type { UserDto } from "~/server/dto/user.dto";

export const useUserDataStore = defineStore("userData", () => {
  // Vars
  const { data } = useAuth();
  const user = data.value?.user as UserDto;

  // Handlers
  const getUser = async () => {
    if (user.isRegistered) {
      try {
        const foundedUser = await $fetch("/api/user/one", {
          method: "GET",
          query: {
            email: user?.email,
          },
        });
        return {
          ...foundedUser,
          isRegistered: true,
        };
      } catch (error) {
        throw createError({
          statusMessage: "User not found.",
        });
      }
    } else {
      return user;
    }
  };

  return {
    getUser,
  };
});
