import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
// import { GraphQLModule } from "@nestjs/graphql";
// import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ArticlesResolver } from "./articles/articles/articles.resolver";
import { BannersResolver } from "./banners/banners/banners.resolver";
import { BrandsResolver } from "./brands/brands/brands.resolver";
import { CategoriesResolver } from "./categories/categories/categories.resolver";
import { NotificationsResolver } from "./notifications/notifications/notifications.resolver";
import { OptionsResolver } from "./options/options/options.resolver";
import { OrdersResolver } from "./orders/orders/orders.resolver";
import { PaymentsResolver } from "./payments/payments/payments.resolver";
import { ProductsResolver } from "./products/products/products.resolver";
import { SettingsResolver } from "./settings/settings/settings.resolver";
import { ShippingsResolver } from "./shippings/shippings/shippings.resolver";
import { UsersResolver } from "./users/users/users.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
      }),
      inject: [ConfigService],
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   subscriptions: {
    //     "graphql-ws": true,
    //   },
    // }),
  ],
  controllers: [AppController],
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
