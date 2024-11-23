import { BannerDto } from "./dto/banner.dto";

export default defineEventHandler(async (event) => {
    try {
        const data = await readBody<BannerDto>(event);
        return await Banner.create(data);
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
            statusCode: 409,
        });
    }
});
