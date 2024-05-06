import { OrderProductDto } from "~/server/api/order/dto/order-product.dto";

export interface OrderDto {
  id?: string;
  orderId: string;
  title: string;
  products: OrderProductDto[];
  customer: string;
  shipping: string;
  shippingAddress: string;
  payment: string;
  status: string;
  date: Date;
  note: string;
}
