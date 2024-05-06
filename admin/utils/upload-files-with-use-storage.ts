import path from "node:path";
import type {MultiPartData} from "~/types";
import renameFile from "./rename-file";

export default (
  data: MultiPartData[] | undefined,
  folderPath: string,
  fieldName: string,
): string[] => {
  const files: string[] = [];
  try {
    if (data) {
      for (const el of data) {
        if (el.name === fieldName && el.filename) {
          const renamedFile = renameFile(el.filename as string);
          const filePath = path.relative(
            process.cwd(),
            folderPath + renamedFile,
          );
          useStorage("fs").setItemRaw(folderPath + renamedFile, el.data);
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
