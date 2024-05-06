import { Notification } from "#imports";
import { NotificationDto } from "~/server/api/notification/dto/notification.dto";

export default defineEventHandler(async (event) => {
  try {
    const notificationBody: NotificationDto = await readBody(event);
    const notification: NotificationDto = await Notification.findById(
      notificationBody.id,
    );

    if (!notification) {
      return createError({
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
    return createError({
      statusMessage: error.message,
    });
  }
});
