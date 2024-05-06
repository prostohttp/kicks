export default (fileNames: string[] | undefined): void => {
  if (!fileNames) return;
  fileNames.forEach(async (fileName) => {
    try {
      await useStorage("fs").removeItem(fileName, { removeMeta: true });
      console.log("File deleted successfully");
    } catch (error) {
      return createError({
        statusMessage: "Error deleting file",
      });
    }
  });
};
