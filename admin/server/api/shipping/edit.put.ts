import { ShippingDto } from "~/server/api/shipping/dto/shipping.dto";

export default defineEventHandler(async (event) => {
    const body: ShippingDto = await readBody(event);

    try {
        const shipping = await Shipping.findById(body.id);
        if (!shipping) {
            throw createError({
                statusMessage: "Shipping method not found",
            });
        }

        if (!body.title || !body.price) {
            throw createError({
                statusMessage: "Title and price are required",
            });
        }

        return await Shipping.findByIdAndUpdate(body.id, body, {
            new: true,
        });
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
