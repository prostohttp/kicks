import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890", 5);
export default defineEventHandler(async (event) => {
  try {
    const {
      title,
      products,
      date,
      customer,
      shipping,
      payment,
      note,
      shippingAddress,
      totalPrice,
    } = await readBody(event);
    const user = await User.findById(customer);
    if (user && user.role.toString() !== Roles.CUSTOMER) {
      return createError({ statusMessage: "Only customers can order" });
    }
    const newOrder = await Order.create({
      orderId: "#" + nanoid(),
      title,
      note,
      shippingAddress,
      customer,
      shipping,
      payment,
      products,
      totalPrice,
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
