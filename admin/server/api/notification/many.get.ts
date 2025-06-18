import { Notification } from './../../models/notification.schema';

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const limit = Number(query.limit);
        const notifications = await Notification.find({ isRead: false })
            .limit(limit)
            .populate({
                path: "order",
                select: "orderId products status",
                populate: {
                    path: "products.productId status",
                    select: "_id title ru en",
                },
            });
        return notifications.filter((notification) => notification.order);
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
