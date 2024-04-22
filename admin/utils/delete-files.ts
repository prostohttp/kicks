import fs from "fs";

export default (fileNames: string[]): void => {
	fileNames.forEach((fileName) => {
		try {
			fs.unlinkSync(fileName);
			console.log("File deleted successfully");
		} catch (error) {
			return createError({
				statusMessage: "Error deleting file",
			});
		}
	});
};
