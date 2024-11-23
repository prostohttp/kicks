import fs from "node:fs";

export default (filePath: string): boolean => {
    const exists = fs.existsSync("public" + filePath);
    return exists;
};
