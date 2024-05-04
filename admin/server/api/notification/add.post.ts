import { Notification } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const newNotification = new Notification(body);
    return await newNotification.save();
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
