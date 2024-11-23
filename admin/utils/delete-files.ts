import fs from "fs";

export default (fileNames: string[]): void => {
    fileNames.forEach((fileName) => {
        try {
            fs.unlinkSync("public" + fileName);
        } catch (error) {
            throw createError({
                statusMessage: "Error deleting file",
            });
        }
    });
};
