import { Notification } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const { id } = getQuery(event);
    const notification = await Notification.findById(id);
    if (!notification) {
      return createError({ statusMessage: "Notification not found" });
    }
    return notification;
  } catch (error: any) {
    throw createError({ statusMessage: error.message });
  }
});
