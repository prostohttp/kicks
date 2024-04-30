import { Notification } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const { id, isRead } = await readBody(event);
    let updatedFields: any = {};
    const notification = await Notification.findById(id);
    if (!notification) {
      return createError({
        statusMessage: "Notification not found",
      });
    }
    if (isRead) {
      updatedFields.isRead = isRead;
    }

    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      updatedFields,
      {
        new: true,
      },
    );
    return updatedNotification;
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
