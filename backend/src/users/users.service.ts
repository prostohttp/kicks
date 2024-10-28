import { Injectable } from "@nestjs/common";
import { User } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GraphQLError } from "graphql";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async isFlatUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new GraphQLError(`Заказы у ${id} покупателя не найдены!`);
    }
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).populate({
      path: "orders",
      populate: [
        { path: "products.productId" },
        { path: "shipping" },
        { path: "payment" },
      ],
    });
    if (!user) {
      throw new GraphQLError(`Пользователь с ${id} не найден!`);
    }
    return user;
  }
}
