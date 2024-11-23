import { ShippingDto } from "~/server/api/shipping/dto/shipping.dto";

export default defineEventHandler(async (event) => {
    const body: ShippingDto = await readBody(event);

    try {
        if (!body.title || !body.price) {
            throw createError({
                statusMessage: "Title and price are required",
            });
        }
        return await Shipping.create(body);
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
            statusCode: 409,
        });
    }
});
