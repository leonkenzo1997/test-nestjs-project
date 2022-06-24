import { Type } from 'class-transformer';
import { IsNotEmpty, MaxLength, ValidateIf, ValidateNested } from 'class-validator';
import { CreateProductIngredientDto } from '../../product-ingredient/dto/create-product-ingredient.dto';
import { AttachFileDto } from './../../files/dto/attach-file.dto';
import { CreateSellerDto } from './../../sellers/dto/create-seller.dto';
import { CreateWholesaleDto } from './../../wholesales/dto/create-wholesale.dto';
export class CreateProductDto {
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsNotEmpty()
    type: number;
    
    @IsNotEmpty()
    @MaxLength(255)
    manufacture: string;

    @IsNotEmpty()
    @MaxLength(255)
    effect: string;

    @IsNotEmpty()
    @MaxLength(255)
    recommendedDosage: string;

    @ValidateNested({ each: true })
    @Type(() => CreateSellerDto)
    sellers: CreateSellerDto[];

    @ValidateNested({ each: true })
    @Type(() => CreateWholesaleDto)
    wholesales: CreateWholesaleDto[];

    @ValidateNested({ each: true })
    @Type(() => CreateProductIngredientDto)
    productIngredients: CreateProductIngredientDto[];

    @IsNotEmpty()
    @ValidateIf((object, value) => value !== null)
    @ValidateNested()
    @Type(() => AttachFileDto)
    image: AttachFileDto;

    @IsNotEmpty()
    @ValidateIf((object, value) => value !== null)
    @ValidateNested()
    @Type(() => AttachFileDto)
    pdf: null | AttachFileDto = null;

}
