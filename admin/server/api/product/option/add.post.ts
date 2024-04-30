import { Option } from "#imports";
import cleanStringToArray from "~/utils/clean-string-to-array";

export default defineEventHandler(async (event) => {
	try {
		const { title, type, values } = await readBody(event);
		const newOption = new Option({
			title,
			type,
			values: cleanStringToArray(values),
		});

		return await newOption.save();
	} catch (error: any) {
		throw createError({
			statusMessage: error.message,
			statusCode: 409,
		});
	}
});
