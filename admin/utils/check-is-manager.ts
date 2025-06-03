import { Roles } from "~/types/server/server.types";
import type { UserDto } from "~/server/dto/user.dto";

export const checkIsManager = (): boolean => {
    const { data } = useAuth();
    let user: UserDto;
    if (data.value) {
        user = data.value.user as UserDto;
    } else {
        return false;
    }
    return user.role === Roles.ADMIN || user.role === Roles.MANAGER;
};
