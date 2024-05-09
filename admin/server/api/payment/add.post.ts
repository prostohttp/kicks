import { PaymentDto } from "~/server/api/payment/dto/payment.dto";

export default defineEventHandler(async (event) => {
  const body: PaymentDto = await readBody(event);

  try {
    const newPayment = new Payment(body);

    return await newPayment.save();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
