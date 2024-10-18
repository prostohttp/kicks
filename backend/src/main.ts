import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { graphqlUploadExpress } from "graphql-upload";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>("cors"),
  });
  app.use(graphqlUploadExpress());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get<number>("port") || 3000);
}
bootstrap();
