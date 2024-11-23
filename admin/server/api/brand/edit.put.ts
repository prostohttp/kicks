import { BrandDto } from "~/server/api/brand/dto/brand.dto";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<BrandDto>(event);
        const brand = await Brand.findById(body._id);
        if (!brand) {
            throw createError({ statusMessage: "Brand not found" });
        }
        return await Brand.findByIdAndUpdate(body._id, body, {
            new: true,
        });
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
