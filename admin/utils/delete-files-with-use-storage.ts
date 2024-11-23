export default (fileNames: string[] | undefined): void => {
    if (!fileNames) return;
    fileNames.forEach(async (fileName) => {
        try {
            await useStorage("fs").removeItem(fileName, { removeMeta: true });
        } catch (error) {
            throw createError({
                statusMessage: "Error deleting file",
            });
        }
    });
};
