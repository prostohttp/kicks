import bcrypt from "bcrypt";
import { UserDto } from "./dto/user.dto";

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
    return createError({
      statusMessage: error.message,
    });
  }
});
