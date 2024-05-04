import { Notification } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);
    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) {
      return createError({
        statusMessage: "Notification not found",
      });
    }
    return {
      statusMessage: "Notification deleted",
    };
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
