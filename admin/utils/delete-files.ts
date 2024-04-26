import fs from "fs";

export default (fileNames: string[]): void => {
	fileNames.forEach((fileName) => {
		console.log(fileName);

		try {
			fs.unlinkSync("public" + fileName);
			console.log("File deleted successfully");
		} catch (error) {
			return createError({
				statusMessage: "Error deleting file",
			});
		}
	});
};
