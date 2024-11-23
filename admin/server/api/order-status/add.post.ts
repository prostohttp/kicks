import { OrderStatusDto } from "~/server/api/order-status/dto/order-status.dto";

export default defineEventHandler(async (event) => {
    try {
        const body: OrderStatusDto = await readBody(event);
        return await OrderStatus.create(body);
    } catch (error: any) {
        return createError({
            statusMessage: error.message,
        });
    }
});
