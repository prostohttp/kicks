import { PaymentDto } from "~/server/api/payment/dto/payment.dto";

export default defineEventHandler(async (event) => {
  const body: PaymentDto = await readBody(event);

  try {
    const payment = await Payment.findById(body.id);
    if (!payment) {
      return createError({
        statusMessage: "Payment method not found",
      });
    }

    if (!body.title) {
      return createError({
        statusMessage: "Title is required",
      });
    }

    const updatedPayment = await Payment.findByIdAndUpdate(
      body.id,
      { ...body, title: body.title },
      {
        new: true,
      },
    );
    return updatedPayment;
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
