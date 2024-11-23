import path from "node:path";
import type { MultiPartData } from "~/types/server/server.types";
import renameFile from "./rename-file";
import { isImage } from "~/utils/is-image";

export default (
    data: MultiPartData[] | undefined,
    folderName: string,
    fieldName: string,
): string[] => {
    const files: string[] = [];
    try {
        if (data) {
            for (const el of data) {
                if (el.name === fieldName && el.filename && el.type) {
                    if (!isImage(el.type)) {
                        throw createError({
                            statusMessage: "File must be an image",
                        });
                    }
                    const renamedFile = renameFile(el.filename as string);
                    const filePath = path.relative(
                        process.cwd(),
                        folderName + renamedFile,
                    );
                    useStorage("fs").setItemRaw(
                        folderName + renamedFile,
                        el.data,
                    );
                    files!.push(filePath);
                }
            }
        }
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
    return files;
};
