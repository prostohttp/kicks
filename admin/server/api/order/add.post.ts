import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890", 5);
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const user = await User.findById(body.customer);
    if (user && user.role.toString() !== Roles.CUSTOMER) {
      return createError({ statusMessage: "Only customers can order" });
    }
    const newOrder = await Order.create({
      orderId: "#" + nanoid(),
      ...body,
      status: OrderStatus.PROCESSING,
    });

    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
