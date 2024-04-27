import { Constants } from "~/constants";
import deleteFiles from "~/utils/delete-files";
import uploadFiles from "~/utils/upload-files";

export default defineEventHandler(async (event) => {
	const data = await readMultipartFormData(event);
	const formData = await readFormData(event);

	const title = formData.get("title");
	const description = formData.get("description");

	const image = uploadFiles(data, Constants.IMG_BRANDS, "image");

	try {
		const newBrand = new Brand({
			title,
			description,
			image: image ? image[0] : "",
		});

		return await newBrand.save();
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
