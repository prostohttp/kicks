import { Module } from "@nestjs/common";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { Product, ProductSchema } from "src/products/product.schema";
import { Payment, PaymentSchema } from "src/payments/payment.schema";
import { Shipping, ShippingSchema } from "src/shippings/shipping.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Payment.name, schema: PaymentSchema },
      { name: Shipping.name, schema: ShippingSchema },
    ]),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UserModule {}
