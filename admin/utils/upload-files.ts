import fs from "node:fs";
import path from "node:path";
import type { MultiPartData } from "~/types";
import renameFile from "./rename-file";

export default (
	data: MultiPartData[] | undefined,
	folderPath: string,
	fieldName: string
): string[] => {
	const files: string[] = [];
	try {
		if (data) {
			data.forEach((el) => {
				if (el.name === fieldName && el.filename) {
					const filePath = path.relative(
						process.cwd(),
						folderPath + renameFile(el.filename as string)
					);
					fs.writeFileSync("public/" + filePath, el.data);
					files.push("/" + filePath);
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