import { OrderStatusDto } from "~/server/api/order-status/dto/order-status.dto";

export default defineEventHandler(async (event) => {
  try {
    const body: OrderStatusDto = await readBody(event);
    const newOrder = await OrderStatus.create(body);
    return await newOrder.save();
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
