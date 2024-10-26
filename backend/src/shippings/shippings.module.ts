import { Module } from "@nestjs/common";
import { ShippingsResolver } from "./shippings.resolver";
import { ShippingsService } from "./shippings.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Shipping, ShippingSchema } from "./shipping.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Shipping.name,
        schema: ShippingSchema,
      },
    ]),
  ],
  providers: [ShippingsResolver, ShippingsService],
})
export class ShippingsModule {}
