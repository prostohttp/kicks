export default defineEventHandler(async (event) => {
  try {
    const { email } = getQuery(event);
    const user = await User.findOne({ email }).select(
      "name email image password role",
    );
    if (!user) {
      throw createError({ statusMessage: "User not found" });
    }
    return user;
  } catch (error: any) {
    throw createError({ statusMessage: error.message });
  }
});
