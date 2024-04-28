import { nanoid } from "nanoid";
import cleanStringToArray from "~/utils/clean-string-to-array";

export default defineEventHandler(async (event) => {
	try {
		const { title, products, date } = await readBody(event);
		const newOrder = await Order.create({
			orderId: "order_" + nanoid(),
			title,
			products: cleanStringToArray(products),
			status: OrderStatus.PROCESSING,
			date,
		});

		const savedOrder = await newOrder.save();
		return savedOrder;
	} catch (error: any) {
		throw createError({
			statusMessage: error.message,
		});
	}
});
