import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);
    const brand = await Brand.findById(id);
    if (!brand) {
      throw createError({ statusMessage: "Brand not found" });
    }
    await Brand.findByIdAndUpdate(id, { image: "" }, { new: true });

    deleteFilesWithUseStorage([brand.image.toString()]);
  } catch (error: any) {
    throw createError({ statusMessage: error.message });
  }
});
