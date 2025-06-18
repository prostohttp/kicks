import { Notification } from './../../models/notification.schema';
export default defineEventHandler(async (event) => {
    try {
        const { id } = await readBody(event);
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            throw createError({
                statusMessage: "Notification not found",
            });
        }
        return {
            statusMessage: "Notification deleted",
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
