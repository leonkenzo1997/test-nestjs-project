import { FilesModule } from './../files/files.module';
import { ProductIngredientModule } from './../product-ingredient/product-ingredient.module';
import { Product } from 'src/v1/products/entities/product.entity';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ProductIngredientModule, FilesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
