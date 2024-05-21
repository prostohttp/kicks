import bcrypt from "bcrypt";
import { UserDto } from "~/server/dto/user.dto";
import { Roles } from "~/types/server/server.types";

export default defineEventHandler(async (event) => {
  try {
    const user: UserDto = await readBody(event);
    const hashed = bcrypt.hashSync(user.password!, 10);
    const newUser = new User({
      ...user,
      password: hashed,
      role: Roles.CUSTOMER,
    });
    return await newUser.save();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
