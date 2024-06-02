import { BrandDto } from "./dto/brand.dto";

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody<BrandDto>(event);
    const newBrand = new Brand(data);
    return await newBrand.save();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
