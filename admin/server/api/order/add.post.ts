import { useId } from "nuxt/app";
import { OrderDto } from "~/server/api/order/dto/order.dto";

export default defineEventHandler(async (event) => {
  try {
    const id = useId();
    const body: OrderDto = await readBody(event);
    const user = await User.findById(body.customer);
    if (user && user.role.toString() !== Roles.CUSTOMER) {
      throw createError({ statusMessage: "Only customers can order" });
    }
    const newOrder = await Order.create({
      ...body,
      orderId: "#" + id,
      status: OrderStatus.PROCESSING,
    });

    return await newOrder.save();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
