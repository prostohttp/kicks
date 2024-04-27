import deleteFiles from "~/utils/delete-files";
import { Constants } from "~/constants";
import uploadFiles from "~/utils/upload-files";

export default defineEventHandler(async (event) => {
	const data = await readMultipartFormData(event);
	const formData = await readFormData(event);

	const updatedFields: any = {};

	const id = formData.get("id");
	const title = formData.get("title");
	const description = formData.get("description");

	const image = uploadFiles(data, Constants.IMG_BRANDS, "image");

	try {
		const brand = await Brand.findById(id);
		if (!brand) {
			throw createError({
				statusMessage: "Brand not found",
			});
		}

		if (title) {
			updatedFields.title = title;
		}
		if (description) {
			updatedFields.description = description;
		} else {
			updatedFields.description = "";
		}
		if (image && image.length > 0) {
			// TODO: Стоит реализовать удаление изображения после изменения на новое
			// deleteFiles([brand.image.toString()]);
			updatedFields.image = image[0];
		} else if (image && !image.length) {
			updatedFields.image = "";
			deleteFiles([brand.image.toString()]);
		}

		const updatedBrand = await Brand.findByIdAndUpdate(id, updatedFields, {
			new: true,
		});
		return updatedBrand;
	} catch (error: any) {
		if (image) {
			deleteFiles(image);
		}

		throw createError({
			statusMessage: error.message,
		});
	}
});
