import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { OptionValue } from "./option-value.schema";

export type OptionDocument = HydratedDocument<Option>;

@Schema()
export class Option {
  @Prop({ required: true, min: 3, type: String })
  title: string;

  @Prop({ required: true, type: String })
  value: string;

  @Prop({ required: true, min: 3, type: String })
  type: string;

  @Prop({ required: true, type: Number })
  sort: number;

  @Prop({
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: "OptionValue",
        required: false,
      },
    ],
  })
  values: OptionValue[];
}

export const OptionSchema = SchemaFactory.createForClass(Option);
