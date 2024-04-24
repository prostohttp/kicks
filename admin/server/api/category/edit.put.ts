import { Constants } from "~/constants";
import { type CategoryDto } from "~/types";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFiles from "~/utils/delete-files";
import uploadFiles from "~/utils/upload-files";

export default defineEventHandler<{
	body: {
		id: string;
		title: string;
		description: string;
		isParent: boolean;
		children: string;
		isEnabled: boolean;
	};
}>(async (event) => {
	const data = await readMultipartFormData(event);
	const formData = await readFormData(event);

	const id = formData.get("id");
	const images = uploadFiles(data, Constants.IMG_CATEGORIES);

	try {
		const category: CategoryDto | null = await Category.findById(id);

		if (!category) {
			return createError({ statusMessage: "Category not found" });
		}

		const updatedFields: any = {};

		const title = formData.get("title");
		if (title) {
			updatedFields.title = title;
		}

		const description = formData.get("description");
		if (description) {
			updatedFields.description = description;
		}

		const isParent = formData.get("isParent");
		if (isParent) {
			updatedFields.isParent = isParent;
		}

		const children = formData.get("children") as string;
		if (children) {
			updatedFields.children = cleanStringToArray(children);
		} else {
			updatedFields.children = [];
		}

		updatedFields.isEnabled = formData.get("isEnabled");

		if (images.length > 0) {
			updatedFields.image = images[0];
		} else {
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
		deleteFiles(images);
		return createError({
			statusMessage: error.message,
		});
	}
});
