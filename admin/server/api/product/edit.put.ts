import { Constants } from "~/constants";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFiles from "~/utils/delete-files";
import uploadFiles from "~/utils/upload-files";

export default defineEventHandler(async (event) => {
	const data = await readMultipartFormData(event);
	const formData = await readFormData(event);

	const id = formData.get("id");
	const image = uploadFiles(data, Constants.IMG_PRODUCTS, "image");
	const additionImages = uploadFiles(
		data,
		Constants.IMG_PRODUCTS,
		"additionImages"
	);

	try {
		const product = await Product.findById(id);

		const title = formData.get("title");
		const description = formData.get("description");
		const categories = formData.get("category") as string;
		const brand = formData.get("brand");
		const sku = formData.get("sku");
		const regularPrice = formData.get("regularPrice");
		const salePrice = formData.get("salePrice");
		const tags = formData.get("tags") as string;
		const isEnabled = formData.get("isEnabled");

		const updatedFields: any = {};

		if (!product) {
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
		if (categories) {
			updatedFields.category = cleanStringToArray(categories);
		} else {
			updatedFields.category = [];
		}
		if (brand) {
			updatedFields.brand = brand;
		} else {
			updatedFields.brand = "";
		}
		if (sku) {
			updatedFields.sku = sku;
		} else {
			updatedFields.sku = "";
		}
		if (regularPrice) {
			updatedFields.regularPrice = regularPrice;
		} else {
			updatedFields.regularPrice = 0;
		}
		if (salePrice) {
			updatedFields.salePrice = salePrice;
		} else {
			updatedFields.salePrice = 0;
		}
		if (tags) {
			updatedFields.tags = cleanStringToArray(tags);
		} else {
			updatedFields.tags = [];
		}
		updatedFields.isEnabled = isEnabled;
		if (image.length > 0) {
			// TODO: Стоит реализовать удаление изображения после изменения на новое
			// deleteFiles([category.image.toString()]);
			updatedFields.image = image[0];
		} else {
			updatedFields.image = "";
			deleteFiles([product.image.toString()]);
		}
		if (additionImages.length > 0) {
			// TODO: Стоит реализовать удаление изображения после изменения на новое
			// deleteFiles([category.image.toString()]);
			updatedFields.additionImages = additionImages;
		} else {
			updatedFields.additionImages = [];
			deleteFiles(additionImages);
		}

		const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, {
			new: true,
		});
		return updatedProduct;
	} catch (error: any) {
		deleteFiles(image);
		deleteFiles(additionImages);
		throw createError({
			statusMessage: error.message,
		});
	}
});
