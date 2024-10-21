import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import * as GraphQLTypes from "src/graphql-types";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ collection: "categories" })
export class Category implements GraphQLTypes.Category {
  @Prop({ required: true, min: 3, type: String })
  title: string;

  @Prop({ required: false, type: String })
  image: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: true, type: Boolean })
  isParent: boolean;

  @Prop({
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: "Category",
        required: false,
      },
    ],
  })
  children: Category[];

  @Prop({ required: true, type: Boolean })
  isEnabled: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
