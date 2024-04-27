import { Constants } from "~/constants";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFiles from "~/utils/delete-files";
import uploadFiles from "~/utils/upload-files";

export default defineEventHandler(async (event) => {
	const data = await readMultipartFormData(event);
	const formData = await readFormData(event);
	const title = formData.get("title");
	const description = formData.get("description");

	const category = formData.get("category") as string;
	const brand = formData.get("brand");
	const sku = formData.get("sku");
	const quantity = formData.get("quantity");
	const regularPrice = formData.get("regularPrice");
	const salePrice = formData.get("salePrice");
	const tags = formData.get("tags") as string;
	const isEnabled = formData.get("isEnabled");

	const image = uploadFiles(data, Constants.IMG_PRODUCTS, "image");
	const additionImages = uploadFiles(
		data,
		Constants.IMG_PRODUCTS,
		"additionImages"
	);

	try {
		const newProduct = new Product({
			title,
			description,
			category: cleanStringToArray(category),
			brand,
			sku,
			quantity,
			regularPrice,
			salePrice,
			tags: cleanStringToArray(tags),
			isEnabled,
			image: image ? image[0] : "",
			additionImages: additionImages ? additionImages : [],
		});
		return await newProduct.save();
	} catch (error: any) {
		if (image) {
			deleteFiles(image);
		}
		if (additionImages) {
			deleteFiles(additionImages);
		}

		throw createError({
			statusMessage: error.message,
			statusCode: 409,
		});
	}
});
