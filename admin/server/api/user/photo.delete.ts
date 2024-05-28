import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);
    const user = await User.findById(id);
    if (!user) {
      throw createError({ statusMessage: "User not found" });
    }
    await User.findByIdAndUpdate(id, { image: "" }, { new: true });

    deleteFilesWithUseStorage([user.image.toString()]);
  } catch (error: any) {
    throw createError({ statusMessage: error.message });
  }
});
