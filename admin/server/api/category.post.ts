import { Category } from "../models/category.schema";

export default defineEventHandler<{
	body: {
		title: string;
		description: string;
		isParent: string;
		children: string[];
		image: string;
	};
}>(async (event) => {
	const { title, description, isParent, children, image } = await readBody(
		event
	);
	try {
		const newCategory = new Category({
			title,
			description,
			isParent,
			children,
			image,
		});
		return await newCategory.save();
	} catch (error) {
		throw createError({
			statusMessage: "Category already exists.",
			statusCode: 409,
		});
	}
});
