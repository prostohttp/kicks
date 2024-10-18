import { GraphQLDefinitionsFactory } from "@nestjs/graphql";
import { join } from "path";

const definitionFactory = new GraphQLDefinitionsFactory();
definitionFactory.generate({
  typePaths: ["./src/**/*.graphql"],
  path: join(process.cwd(), "src/graphql-types.ts"),
  outputAs: "class",
  watch: true,
  skipResolverArgs: true,
});
