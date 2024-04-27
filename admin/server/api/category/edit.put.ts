import { Constants } from "~/constants";
import { type CategoryDto } from "~/types";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFiles from "~/utils/delete-files";
import uploadFiles from "~/utils/upload-files";

export default defineEventHandler(async (event) => {
	const data = await readMultipartFormData(event);
	const formData = await readFormData(event);

	const id = formData.get("id");
	const images = uploadFiles(data, Constants.IMG_CATEGORIES, "image");

	try {
		const category: CategoryDto | null = await Category.findById(id);

		const title = formData.get("title");
		const description = formData.get("description");
		const isParent = formData.get("isParent");
		const children = formData.get("children") as string;
		const isEnabled = formData.get("isEnabled");

		const updatedFields: any = {};

		if (!category) {
			throw createError({ statusMessage: "Category not found" });
		}
		if (title) {
			updatedFields.title = title;
		}
		if (description) {
			updatedFields.description = description;
		} else {
			updatedFields.description = "";
		}
		if (isParent) {
			updatedFields.isParent = isParent;
		}
		if (children) {
			updatedFields.children = cleanStringToArray(children);
		} else {
			updatedFields.children = [];
		}
		updatedFields.isEnabled = isEnabled;
		if (images && images.length > 0) {
			// TODO: Стоит реализовать удаление изображения после изменения на новое
			// deleteFiles([category.image.toString()]);
			updatedFields.image = images[0];
		} else if (images && !images.length) {
			updatedFields.image = "";
			deleteFiles([category.image.toString()]);
		}

		const updatedCategory = await Category.findByIdAndUpdate(
			id,
			updatedFields,
			{ new: true }
		);
		return updatedCategory;
	} catch (error: any) {
		if (images) {
			deleteFiles(images);
		}
		throw createError({
			statusMessage: error.message,
		});
	}
});
