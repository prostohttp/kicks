import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { AppService } from "./app.service";
import { ArticlesResolver } from "./articles/articles.resolver";
import { BannersResolver } from "./banners/banners.resolver";
import { BrandsResolver } from "./brands/brands.resolver";
import { CategoriesResolver } from "./categories/categories.resolver";
import { NotificationsResolver } from "./notifications/notifications.resolver";
import { OptionsResolver } from "./options/options.resolver";
import { OrdersResolver } from "./orders/orders.resolver";
import { PaymentsResolver } from "./payments/payments.resolver";
import { ProductsResolver } from "./products/products.resolver";
import { SettingsResolver } from "./settings/settings.resolver";
import { ShippingsResolver } from "./shippings/shippings.resolver";
import { UserModule } from "./users/user.module";
import { UsersResolver } from "./users/users.resolver";
import configuration from "./config/configuration";
import { validate } from "./env.validation";

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ["./src/**/*.graphql"],
      subscriptions: {
        "graphql-ws": true,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${process.cwd()}/.env.${process.env.NODE_ENV}`],
      load: [configuration],
      validate: validate,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("dbUri"),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AppService,
    ArticlesResolver,
    BannersResolver,
    BrandsResolver,
    CategoriesResolver,
    NotificationsResolver,
    OptionsResolver,
    OrdersResolver,
    PaymentsResolver,
    ProductsResolver,
    SettingsResolver,
    ShippingsResolver,
    UsersResolver,
  ],
})
export class AppModule {}
