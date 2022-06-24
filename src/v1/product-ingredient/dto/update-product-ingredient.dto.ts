import { PartialType } from '@nestjs/mapped-types';
import { CreateProductIngredientDto } from './create-product-ingredient.dto';

export class UpdateProductIngrendientDto extends PartialType(CreateProductIngredientDto) {}
