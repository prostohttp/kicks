import { Notification } from './../../models/notification.schema';
export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const limit = Number(query.limit);
        const notifications = await Notification.aggregate([
            { $match: { isRead: false } },
            { $limit: limit },
        ]);
        for (const notification of notifications) {
            await Notification.updateOne(
                { _id: notification._id },
                { $set: { isRead: true } },
            );
        }
        return await $fetch("/api/notification/many", {
            method: "GET",
            query: {
                limit,
            },
        });
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
