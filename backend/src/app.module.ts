import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { UserModule } from "./users/user.module";
import configuration from "./config/configuration";
import { validate } from "./env.validation";
import { ArticlesModule } from "./articles/articles.module";
import { BannersModule } from "./banners/banners.module";
import { BrandsModule } from "./brands/brands.module";
import { CategoriesModule } from "./categories/categories.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { OptionValuesModule } from "./option-values/option-values.module";
import { OptionsModule } from "./options/options.module";
import { OrdersModule } from "./orders/orders.module";
import { PaymentsModule } from "./payments/payments.module";
import { ProductsModule } from "./products/products.module";
import { SettingsModule } from "./settings/settings.module";
import { ShippingsModule } from "./shippings/shippings.module";
import { DateScalar } from "./types/scalars/date.scalar";
import { AuthModule } from "./auth/auth.module";

mongoose.set("toJSON", {
  versionKey: false,
});

@Module({
  imports: [
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
    ArticlesModule,
    BannersModule,
    BrandsModule,
    CategoriesModule,
    NotificationsModule,
    OptionValuesModule,
    OptionsModule,
    OrdersModule,
    PaymentsModule,
    ProductsModule,
    SettingsModule,
    ShippingsModule,
    UserModule,
    AuthModule,
  ],
  providers: [DateScalar],
})
export class AppModule {}
