export default defineEventHandler(async (event) => {
  try {
    const {id} = await readBody(event);
    const foundedUser = await User.findByIdAndDelete(id);
    if (!foundedUser) {
      return createError({
        statusMessage: "User not found"
      })
    }
    return {
      statusMessage: "User deleted"
    }
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
})
