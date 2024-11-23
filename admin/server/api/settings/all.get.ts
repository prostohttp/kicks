import { SettingsDto } from "./dto/settings.dto";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const locale = query.locale;
        const currency = query.currency;
        const settings: SettingsDto | null = await Settings.findOne();

        if (query && locale && settings) {
            return settings.localeDashboard.value;
        } else if (query && currency && settings) {
            return settings.currency.value;
        } else {
            return settings;
        }
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
