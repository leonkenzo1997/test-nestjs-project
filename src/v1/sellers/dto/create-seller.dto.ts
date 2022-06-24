import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSellerDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    link: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
    
}
