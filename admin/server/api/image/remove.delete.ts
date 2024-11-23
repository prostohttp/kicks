import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";

export default defineEventHandler(async (event) => {
    try {
        const { image } = await readBody(event);
        deleteFilesWithUseStorage([image.toString()]);
    } catch (error: any) {
        throw createError({ statusMessage: error.message });
    }
});
