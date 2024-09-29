import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type OptionDocument = HydratedDocument<Option>;

@Schema()
export class Option {
  @Prop({ required: true, min: 3, type: String })
  title: string;

  @Prop({ required: true, min: 3, type: String })
  type: string;

  @Prop({ required: true, type: Number })
  sort: number;

  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      ref: "OptionValue",
      required: false,
    },
  ])
  values: (MongooseSchema.Types.ObjectId | string)[];
}

export const OptionSchema = SchemaFactory.createForClass(Option);
