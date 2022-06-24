import { IsNotEmpty, IsNumber } from 'class-validator';

export class AttachFileDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
