import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  try {
    const {name, email, password} = await readBody(event);
    const hashed = bcrypt.hashSync(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashed,
      role: Roles.CUSTOMER,
    })
    return await newUser.save();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
})
