import { IsNotEmpty, MinLength } from "class-validator";
import * as GraphQlTypes from "src/graphql-types";

class FlatProduct implements GraphQlTypes.FlatProducts {
  @MinLength(4, { message: "Минимум 4 символов" })
  productId: string;

  @MinLength(1, { message: "Больше 0" })
  productCount: number;
}

export class CreateOrderDto implements GraphQlTypes.InputOrder {
  @MinLength(4)
  orderId: string;

  products: FlatProduct[];

  @IsNotEmpty({ message: "Не пустое поле" })
  customer: string;

  @IsNotEmpty({ message: "Не пустое поле" })
  shipping: string;

  @IsNotEmpty({ message: "Не пустое поле" })
  payment: string;

  @IsNotEmpty({ message: "Не пустое поле" })
  date: string;

  @MinLength(10, { message: "Минимум 10 символов" })
  shippingAddress?: string;

  @IsNotEmpty({ message: "Не пустое поле" })
  status: string;

  note?: string;
}
