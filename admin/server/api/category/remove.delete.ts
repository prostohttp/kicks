import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return createError({ statusMessage: "Category not found" });
    }

    deleteFilesWithUseStorage([category.image.toString()]);

    return {
      statusMessage: "Category deleted",
    };
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
