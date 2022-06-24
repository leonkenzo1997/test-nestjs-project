import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, IsNumber, ValidateNested } from 'class-validator';

class IngredientDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

}
export class CreateProductIngredientDto {
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => IngredientDto)
    ingredient: IngredientDto;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

}
