import { BannerDto } from "./dto/banner.dto";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<BannerDto>(event);
        const banner = await Banner.findById(body._id);
        if (!banner) {
            throw createError({ statusMessage: "Banner not found" });
        }
        return await Banner.findByIdAndUpdate(body._id, body, {
            new: true,
        });
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
