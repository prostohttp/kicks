import { Notification } from './../../models/notification.schema';
import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const page = Number(query.page);
        const perPage = Number(query.perPage);
        const forUi = query.forUi || false;
        const forUiLimit = Number(query.forUiLimit) || 4;

        if (forUi) {
            return await Notification.find({ isRead: false }).limit(forUiLimit);
        }

        const notifications = await Notification.find();
        const notificationsLength = notifications.length;
        const pagesInPagination = pageCount(notificationsLength, perPage);

        if (
            isValidPaginationPage(
                page,
                pagesInPagination,
                notificationsLength,
                perPage,
            )
        ) {
            return {
                notifications,
                pagesInPagination: 0,
            };
        }

        const skip = page * perPage - perPage;

        const notificationInPage = await Notification.find()
            .skip(skip)
            .limit(perPage);
        return {
            notifications: notificationInPage,
            pagesInPagination,
            activePage: page,
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
