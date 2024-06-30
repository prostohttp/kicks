export default defineEventHandler(async (event) => {
  try {
    const { email, id } = getQuery(event);
    let user;
    if (email) {
      user = await User.findOne({ email }).select("name email image role");
    }
    if (id) {
      user = await User.findById(id).select("name email image role");
    }

    if (!user) {
      throw createError({ statusMessage: "User not found" });
    }
    return user;
  } catch (error: any) {
    throw createError({ statusMessage: error.message });
  }
});
