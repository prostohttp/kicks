import { SettingsDto } from "./dto/settings.dto";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const settings = await $fetch<SettingsDto>("/api/settings/all", {
            method: "GET",
        });
        return await Settings.findByIdAndUpdate(settings._id, body, {
            new: true,
        });
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
