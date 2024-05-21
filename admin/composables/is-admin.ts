import { Roles } from "~/types/server/server.types";
import type { UserDto } from "~/server/dto/user.dto";

export const useIsAdmin = () => {
  const { data } = useAuth();
  const user = data.value?.user as UserDto;
  return computed(() => user.role === Roles.ADMIN);
};
