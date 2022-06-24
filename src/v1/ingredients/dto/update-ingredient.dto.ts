import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, Max } from 'class-validator';
import { CreateIngredientDto } from './create-ingredient.dto';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @Max(3000)
    description: string;

    @IsNotEmpty()
    recommended_amount: number;
}
