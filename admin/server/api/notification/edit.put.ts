import { Notification } from "#imports";
import { NotificationDto } from "~/server/api/notification/dto/notification.dto";

export default defineEventHandler(async (event) => {
    try {
        const notificationBody: NotificationDto = await readBody(event);
        const notification: NotificationDto | null =
            await Notification.findById(notificationBody.id);

        if (!notification) {
            throw createError({
                statusMessage: "Notification not found",
            });
        }

        return await Notification.findByIdAndUpdate(
            notificationBody.id,
            { ...notificationBody, isRead: notificationBody.isRead },
            {
                new: true,
            },
        );
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
