import { Category } from "~/server/models/category.schema";
import { Constants } from "~/constants";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFiles from "~/utils/delete-files";
import uploadFiles from "~/utils/upload-files";

export default defineEventHandler(async (event) => {
	const data = await readMultipartFormData(event);
	const formData = await readFormData(event);

	const title = formData.get("title");
	const description = formData.get("description");
	const isParent = formData.get("isParent");
	const children = formData.get("children") as string;

	const image = uploadFiles(data, Constants.IMG_CATEGORIES, "image");
	try {
		const newCategory = new Category({
			title,
			description,
			isParent,
			isEnabled: true,
			children: cleanStringToArray(children),
			productCount: 0,
			image: image ? image[0] : "",
		});
		return await newCategory.save();
	} catch (error: any) {
		if (image) {
			deleteFiles(image);
		}

		throw createError({
			statusMessage: error.message,
			statusCode: 409,
		});
	}
});
