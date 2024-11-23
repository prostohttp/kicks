import { PaymentDto } from "~/server/api/payment/dto/payment.dto";

export default defineEventHandler(async (event) => {
    const body: PaymentDto = await readBody(event);

    try {
        return await Payment.create(body);
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
            statusCode: 409,
        });
    }
});
