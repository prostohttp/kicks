import { Notification } from "#imports";
import { NotificationDto } from "~/server/api/notification/dto/notification.dto";

export default defineEventHandler(async (event) => {
  try {
    const body: NotificationDto = await readBody(event);
    const orderId = body.orderId;
    const order = await Order.findById(orderId).select("_id");
    // const products = await Product.find({
    //   _id: { $in: [...order!.products.map((p) => p.productId)] },
    // }).select("title");
    const newNotification = new Notification({
      ...body,
      isRead: false,
      order: order?._id,
    });
    return await newNotification.save();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
