import { Notification } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const { id, isRead } = await readBody(event);
    const notification = await Notification.findById(id);

    if (!notification) {
      return createError({
        statusMessage: "Notification not found",
      });
    }

    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { isRead },
      {
        new: true,
      },
    );
    return updatedNotification;
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
