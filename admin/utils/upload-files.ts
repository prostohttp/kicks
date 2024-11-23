import fs from "node:fs";
import path from "node:path";
import type { MultiPartData } from "~/types/server/server.types";
import renameFile from "./rename-file";
import checkExistsFolder from "./check-exists-folder";

export default (
    data: MultiPartData[] | undefined,
    folderPath: string,
    fieldName: string,
): string[] | false => {
    const files: string[] = [];
    const imgPath = path.resolve(process.cwd(), "public/" + folderPath);
    try {
        if (data) {
            data.forEach((el) => {
                if (el.name === fieldName && el.filename) {
                    const filePath = path.relative(
                        process.cwd(),
                        folderPath + renameFile(el.filename as string),
                    );
                    if (!checkExistsFolder(imgPath)) {
                        fs.mkdirSync(imgPath);
                    }
                    fs.writeFileSync("public/" + filePath, el.data);
                    files!.push("/" + filePath);
                }
            });
        }
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
    return files;
};
