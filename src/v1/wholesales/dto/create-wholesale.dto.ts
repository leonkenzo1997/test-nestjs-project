import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from "class-validator";

export class CreateWholesaleDto {
    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    address: string;

    @IsNumber()
    price: number
}
