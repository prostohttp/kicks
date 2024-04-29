import { Notification } from "#imports";

export default defineEventHandler(async (event) => {
	try {
		const { title, order, isRead } = await readBody(event);
		const newNotification = new Notification({
			title,
			order,
			isRead,
		});
		return await newNotification.save();
	} catch (error: any) {
		throw createError({
			statusMessage: error.message,
		});
	}
});
