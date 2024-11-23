import bcrypt from "bcrypt";
import { UserDto } from "~/server/dto/user.dto";
import { Roles } from "~/types/server/server.types";

export default defineEventHandler(async (event) => {
    try {
        const user: UserDto = await readBody(event);
        const hashed = bcrypt.hashSync(user.password!, 10);
        return await User.create({
            ...user,
            password: hashed,
            role: Roles.CUSTOMER,
        });
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
