import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Roles } from "src/types/role";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, min: 3, type: String })
  name: string;

  @Prop({ required: true, min: 3, type: String, unique: true })
  email: string;

  @Prop({ required: true, min: 6, type: String })
  password: string;

  @Prop({ required: true, type: String, default: Roles.CUSTOMER })
  role: Roles;

  @Prop({ required: false, type: String })
  image: string;

  @Prop({ required: false, type: String })
  address: string;

  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      ref: "Order",
      required: false,
    },
  ])
  orders: (MongooseSchema.Types.ObjectId | string)[];
}

export const UserSchema = SchemaFactory.createForClass(User);
