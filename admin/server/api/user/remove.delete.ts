import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";

export default defineEventHandler(async (event) => {
    try {
        const { id } = await readBody(event);
        const foundedUser = await User.findByIdAndDelete(id);
        if (!foundedUser) {
            throw createError({
                statusMessage: "User not found",
            });
        }

        deleteFilesWithUseStorage([foundedUser.image?.toString()]);
        return {
            statusMessage: "User deleted",
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
