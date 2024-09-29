import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Order",
    required: true,
  })
  order: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: true, type: Boolean })
  isRead: boolean;

  @Prop({ required: true, type: Date })
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
