export default defineEventHandler(async (event) => {
  const { id, name, email } = await readBody(event);
  const updatedFields: any = {};

  try {
    const user = await User.findById(id);
    if (!user || (user && user.role.toString() !== Roles.CUSTOMER)) {
      throw createError({
        statusMessage: "User not found",
      });
    }

    if (name) {
      updatedFields.name = name;
    }
    if (email) {
      updatedFields.email = email;
    } else {
      updatedFields.email = "";
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    return updatedUser;
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
