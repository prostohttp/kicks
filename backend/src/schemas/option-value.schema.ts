import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type OptionValueDocument = HydratedDocument<OptionValue>;

@Schema()
export class OptionValue {
  @Prop({ required: true, type: String })
  value: string;

  @Prop({ required: true, type: Number })
  sort: number;

  @Prop({ required: false, type: String })
  image: string;
}

export const OptionValueSchema = SchemaFactory.createForClass(OptionValue);
