import { Injectable } from "@nestjs/common";
import { Payment } from "./payment.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GraphQLError } from "graphql";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
  ) {}

  async findAll(): Promise<Payment[]> {
    return await this.paymentModel.find();
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(id);
    if (!payment) {
      throw new GraphQLError(`Метод оплаты с ${id} не найден!`);
    }
    return payment;
  }
}
