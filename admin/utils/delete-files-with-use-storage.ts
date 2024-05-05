export default (fileNames: string[]): void => {
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
