import { BannerDto } from "./dto/banner.dto";

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody<BannerDto>(event);
    const newBanner = new Banner(data);
    return await newBanner.save();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
