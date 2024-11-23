import { OrderDto } from "~/server/api/order/dto/order.dto";

export default defineEventHandler(async (event) => {
    try {
        const body: OrderDto = await readBody(event);
        const order = await Order.findById(body.id);

        if (!order) {
            throw createError({ statusMessage: "Order not found" });
        }
        if (!body.customer || !body.shipping || !body.payment || !body.date) {
            throw createError({
                statusMessage:
                    "Customer, shipping, payment, date fields are required",
            });
        }

        return await Order.findByIdAndUpdate(body.id, body, {
            new: true,
        });
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
