import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { OptionValue } from "../option-values/option-value.schema";
import * as GraphQLTypes from "src/graphql-types";

export type OptionDocument = HydratedDocument<Option>;

@Schema()
export class Option implements GraphQLTypes.Option {
  @Prop({ required: true, min: 3, type: String })
  title: string;

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
