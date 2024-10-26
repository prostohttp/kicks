import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import * as GraphQLTypes from "src/graphql-types";

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification implements GraphQLTypes.Notification {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Order",
    required: true,
  })
  order: string;

  @Prop({ required: true, type: Boolean })
  isRead: boolean;

  @Prop({ required: true, type: Date })
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
