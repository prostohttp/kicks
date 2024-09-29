import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type OptionValueDocument = HydratedDocument<OptionValue>;

@Schema()
export class OptionValue {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Option",
    required: true,
  })
  optionId: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: true, type: String })
  value: string;

  @Prop({ required: true, type: Number })
  sort: number;

  @Prop({ required: false, type: String })
  image: string;
}

export const OptionValueSchema = SchemaFactory.createForClass(OptionValue);
