import { ShippingDto } from "~/server/api/shipping/dto/shipping.dto";

export default defineEventHandler(async (event) => {
  const body: ShippingDto = await readBody(event);

  try {
    if (!body.title || !body.price) {
      throw createError({
        statusMessage: "Title and price are required",
      });
    }

    const newShipping = new Shipping(body);
    return await newShipping.save();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
