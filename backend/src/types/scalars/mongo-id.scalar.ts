import { Scalar, CustomScalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";
import mongoose from "mongoose";

@Scalar("MongoId")
export class MongoIdScalar
  implements CustomScalar<string, mongoose.Types.ObjectId>
{
  description = "MongoId пользовательский скаляр";

  parseValue(value: string): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId(value);
  }

  serialize(value: mongoose.Types.ObjectId): string {
    return value.toString();
  }

  parseLiteral(ast: ValueNode): mongoose.Types.ObjectId {
    if (ast.kind === Kind.STRING) {
      return new mongoose.Types.ObjectId(ast.value);
    }
    return null;
  }
}
