import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Roles } from "src/types/role";
import { Order } from "./order.schema";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, min: 3, type: String })
  name: string;

  @Prop({ required: true, min: 3, type: String, unique: true })
  email: string;

  @Prop({ required: true, min: 6, type: String })
  password: string;

  @Prop({ type: { required: true, type: String, default: Roles.CUSTOMER } })
  role: Roles;

  @Prop({ required: false, type: String })
  image: string;

  @Prop({ required: false, type: String })
  address: string;

  @Prop({
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: "Order",
        required: false,
      },
    ],
  })
  orders: Order[];
}

export const UserSchema = SchemaFactory.createForClass(User);
