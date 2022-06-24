import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseService } from 'src/utils/response.service';
import { Product } from 'src/v1/products/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductIngredient } from './entities/product-ingredient.entity';

@Injectable()
export class ProductIngredientService {
  constructor(
    @InjectRepository(ProductIngredient)
    private productIngredientRepository: Repository<ProductIngredient>,
    private res: ResponseService,
  ) { }

}
