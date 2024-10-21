import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as GraphQLTypes from "src/graphql-types";

export type BrandDocument = HydratedDocument<Brand>;

@Schema()
export class Brand implements GraphQLTypes.Brand {
  @Prop({ required: true, min: 3, type: String })
  title: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: false, type: String })
  image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
