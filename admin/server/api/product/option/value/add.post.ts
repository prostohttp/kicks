import { Option } from "#imports";
import { Constants } from "~/constants";
import deleteFiles from "~/utils/delete-files";
import uploadFiles from "~/utils/upload-files";

export default defineEventHandler(async (event) => {
	const data = await readMultipartFormData(event);
	const formData = await readFormData(event);

	const title = formData.get("title");
	const value = formData.get("value");
	const parentOption = formData.get("parentOption");

	const image = uploadFiles(data, Constants.IMG_OPTIONS, "image");

	try {
		const newOptionValue = new OptionValue({
			title,
			parentOption,
			value,
			image: image ? image[0] : "",
		});

		const savedOptionValue = await newOptionValue.save();
		await Option.findByIdAndUpdate(
			parentOption,
			{
				$push: { values: savedOptionValue._id },
			},
			{
				new: true,
			}
		);

		return savedOptionValue;
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
