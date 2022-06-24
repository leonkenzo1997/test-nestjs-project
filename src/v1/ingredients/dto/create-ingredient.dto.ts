import { MaxLength } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
export class CreateIngredientDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @MaxLength(3000)
    description: string;

    @IsNotEmpty()
    recommendedAmount: number;
}
