import { customAlphabet } from "nanoid";
import { OrderDto } from "~/server/api/order/dto/order.dto";
import { OrderStatus, Roles } from "~/types/server/server.types";

const nanoid = customAlphabet("1234567890", 5);
export default defineEventHandler(async (event) => {
  try {
    const body: OrderDto = await readBody(event);
    const user = await User.findById(body.customer);
    if (user && user.role.toString() !== Roles.CUSTOMER) {
      return createError({ statusMessage: "Only customers can order" });
    }
    const newOrder = await Order.create({
      ...body,
      orderId: "#" + nanoid(),
      status: OrderStatus.PROCESSING,
    });

    return await newOrder.save();
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
