import { Scalar, CustomScalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";
import mongoose from "mongoose";

@Scalar("MongoId")
export class MongoIdScalar
  implements CustomScalar<string, mongoose.Types.ObjectId>
{
  description = "Date custom scalar type";

  parseValue(value: string): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId(value);
  }

  serialize(value: mongoose.Types.ObjectId): string {
    return value.toString();
  }

  parseLiteral(ast: ValueNode): mongoose.Types.ObjectId {
    if (ast.kind === Kind.INT) {
      return new mongoose.Types.ObjectId(ast.value);
    }
    return null;
  }
}
