import { Category } from "../models/category.schema";
import fs from "node:fs";
import path from "node:path";
import { string } from "zod";

export default defineEventHandler<{
	body: {
		title: string;
		description?: string;
		isParent: string;
		children?: string[];
		productCount?: number;
	};
}>(async (event) => {
	try {
		const data = await readMultipartFormData(event);
		const formData = await readFormData(event);
		const title = formData.get("title");
		const description = formData.get("description");
		const isParent = formData.get("isParent");
		const children = formData.get("children") || [];
		const productCount = formData.get("productCount");

		let filePath;
		string;
		data?.forEach((el) => {
			if (el.name === "image") {
				filePath = path.join(
					process.cwd(),
					"public/img/categories",
					el.filename as string
				);
				fs.writeFileSync(filePath, el.data);
			}
		});

		const newCategory = new Category({
			title,
			description,
			isParent,
			children,
			productCount,
			image: filePath,
		});
		return await newCategory.save();
	} catch (error: any) {
		throw createError({
			statusMessage: error.message,
			statusCode: 409,
		});
	}
});
