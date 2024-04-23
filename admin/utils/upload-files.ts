import fs from "node:fs";
import path from "node:path";
import type { MultiPartData } from "~/types";
import renameFile from "./rename-file";

export default (
	data: MultiPartData[] | undefined,
	folderPath: string
): string[] => {
	const files: string[] = [];
	if (data) {
		data.forEach((el) => {
			if (el.name === "image" && el.filename) {
				const filePath = path.join(
					process.cwd(),
					folderPath,
					renameFile(el.filename as string)
				);
				fs.writeFileSync(filePath, el.data);
				files.push(filePath);
			}
		});
	}
	return files;
};
