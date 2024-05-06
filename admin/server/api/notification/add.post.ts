import { Notification } from "#imports";
import { NotificationDto } from "~/server/api/notification/dto/notification.dto";

export default defineEventHandler(async (event) => {
  try {
    const body: NotificationDto = await readBody(event);
    const newNotification = new Notification(body);
    return await newNotification.save();
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
