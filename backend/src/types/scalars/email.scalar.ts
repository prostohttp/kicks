import { Scalar, CustomScalar } from "@nestjs/graphql";
import { GraphQLError, Kind, ValueNode } from "graphql";

@Scalar("Email")
export class EmailScalar implements CustomScalar<string, string> {
  description = "Email пользовательский скаляр";

  private validateEmail(email: string): boolean {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }

  parseValue(value: string): string {
    if (!this.validateEmail(value)) {
      throw new GraphQLError("Неверный формат email");
    }
    return value;
  }

  serialize(value: string): string {
    if (!this.validateEmail(value)) {
      throw new GraphQLError("Неверный формат email");
    }
    return value.toString();
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind === Kind.STRING && this.validateEmail(ast.value)) {
      return ast.value;
    }
    throw new GraphQLError("Неверный формат email");
  }
}
