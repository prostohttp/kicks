export default defineEventHandler(async (event) => {
  try {
    const { email } = getQuery(event);
    const user = await User.findOne({ email }).select("name email image");
    if (!user) {
      return createError({ statusMessage: "User not found" });
    }
    return user;
  } catch (error: any) {
    return createError({ statusMessage: error.message });
  }
});
