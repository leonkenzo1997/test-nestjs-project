import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductIngredient } from './entities/product-ingredient.entity';
import { ProductIngredientService } from './product-ingredient.services';

@Module({
    imports: [
      TypeOrmModule.forFeature([ProductIngredient]),
    ],
    providers: [ProductIngredientService],
    exports: [ProductIngredientService],
  })

export class ProductIngredientModule {}
