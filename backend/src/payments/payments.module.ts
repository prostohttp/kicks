import { Module } from "@nestjs/common";
import { PaymentsResolver } from "./payments.resolver";
import { PaymentsService } from "./payments.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Payment, PaymentSchema } from "./payment.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  providers: [PaymentsResolver, PaymentsService],
})
export class PaymentsModule {}
