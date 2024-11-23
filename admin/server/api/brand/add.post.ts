import { BrandDto } from "./dto/brand.dto";

export default defineEventHandler(async (event) => {
    try {
        const data = await readBody<BrandDto>(event);
        return await Brand.create(data);
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
            statusCode: 409,
        });
    }
});
