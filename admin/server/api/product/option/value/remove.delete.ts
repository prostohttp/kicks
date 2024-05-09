import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);
    const optionValue = await OptionValue.findByIdAndDelete(id);
    if (!optionValue) {
      throw createError({
        statusMessage: "Option value not found",
      });
    }

    deleteFilesWithUseStorage([optionValue.image?.toString()]);
    return {
      statusMessage: "Option value deleted",
    };
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
