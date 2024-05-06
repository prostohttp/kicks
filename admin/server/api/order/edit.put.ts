import { OrderDto } from "~/server/api/order/dto/order.dto";

export default defineEventHandler(async (event) => {
  try {
    const body: OrderDto = await readBody(event);
    const order = await Order.findById(body.id);

    if (!order) {
      return createError({ statusMessage: "Order not found" });
    }
    if (
      !body.title ||
      !body.customer ||
      !body.shipping ||
      !body.payment ||
      !body.date
    ) {
      return createError({
        statusMessage:
          "Title, customer, shipping, payment, date fields are required",
      });
    }

    return await Order.findByIdAndUpdate(body.id, body, {
      new: true,
    });
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
