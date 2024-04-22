import { Category } from "~/server/models/category.schema";
import { Constants } from "~/constants";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFiles from "~/utils/delete-files";
import uploadFiles from "~/utils/upload-files";

export default defineEventHandler<{
	body: {
		title: string;
		description?: string;
		isParent: string;
		children?: string;
		productCount?: number;
	};
}>(async (event) => {
	const data = await readMultipartFormData(event);
	const formData = await readFormData(event);

	const title = formData.get("title");
	const description = formData.get("description");
	const isParent = formData.get("isParent");
	const children = formData.get("children") as string;
	const productCount = formData.get("productCount") || 0;

	const images = uploadFiles(data, Constants.IMG_CATEGORIES);
	try {
		const newCategory = new Category({
			title,
			description,
			isParent,
			children: cleanStringToArray(children),
			productCount,
			image: images[0],
		});
		return await newCategory.save();
	} catch (error: any) {
		deleteFiles(images);
		throw createError({
			statusMessage: error.message,
			statusText: "Category already exists",
			statusCode: 409,
		});
	}
});
