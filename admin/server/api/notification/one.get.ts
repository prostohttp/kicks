import { Notification } from './../../models/notification.schema';
export default defineEventHandler(async (event) => {
    try {
        const { id } = getQuery(event);
        const notification = await Notification.findById(id);
        if (!notification) {
            throw createError({ statusMessage: "Notification not found" });
        }
        return notification;
    } catch (error: any) {
        throw createError({ statusMessage: error.message });
    }
});
