import { Module } from '@nestjs/common';
import { AppRoute } from './app.route';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { SessionsModule } from './sessions/sessions.module';
import { FilesModule } from './files/files.module';
import { S3Module } from './s3/s3.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { ProductsModule } from './products/products.module';
import { SellersModule } from './sellers/sellers.module';
import { WholesalesModule } from './wholesales/wholesales.module';
import { ProductIngredientModule } from './product-ingredient/product-ingredient.module';

@Module({
  imports: [
    // RulesModule,
    // RolesModule,
    AppRoute,
    AuthModule,
    UsersModule,
    CategoriesModule,
    SessionsModule,
    FilesModule,
    S3Module,
    IngredientsModule,
    ProductsModule,
    SellersModule,
    WholesalesModule,
    ProductIngredientModule,
  ],
})
export class AppModule {
  // empty
}
