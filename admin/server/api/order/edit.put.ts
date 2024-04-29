export default defineEventHandler(async (event) => {
	try {
		const {
			id,
			shipping,
			payment,
			shippingAddress,
			status,
			note,
			products,
			totalPrice,
		} = await readBody(event);
		const order = await Order.findById(id);

		const updatedFields: any = {};

		if (!order) {
			return createError({ statusMessage: "Order not found" });
		}
		if (shipping) {
			updatedFields.shipping = shipping;
		}
		if (payment) {
			updatedFields.payment = payment;
		} else {
			updatedFields.payment = "";
		}
		if (shippingAddress) {
			updatedFields.shippingAddress = shippingAddress;
		} else {
			updatedFields.shippingAddress = "";
		}
		if (note) {
			updatedFields.note = note;
		} else {
			updatedFields.note = "";
		}
		if (status) {
			updatedFields.status = status;
		}
		updatedFields.products = products;
		updatedFields.totalPrice = totalPrice;

		return await Order.findByIdAndUpdate(id, updatedFields, {
			new: true,
		});
	} catch (error: any) {
		throw createError({
			statusMessage: error.message,
		});
	}
});
