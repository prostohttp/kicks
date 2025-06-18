import { Notification } from './../../models/notification.schema';
import { NotificationDto } from "~/server/api/notification/dto/notification.dto";

export default defineEventHandler(async (event) => {
    try {
        const body: NotificationDto = await readBody(event);
        const orderId = body.order.orderId;
        const order = await Order.findById(orderId).select("_id");
        // const products = await Product.find({
        //   _id: { $in: [...order!.products.map((p) => p.productId)] },
        // }).select("title");
        return await Notification.create({
            ...body,
            isRead: false,
            order: order?._id,
        });
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
