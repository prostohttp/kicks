import fs from "fs";

export default (fileNames: string[]): void => {
  fileNames.forEach((fileName) => {
    try {
      fs.unlinkSync("public" + fileName);
      console.log("File deleted successfully");
    } catch (error) {
      throw createError({
        statusMessage: "Error deleting file",
      });
    }
  });
};
