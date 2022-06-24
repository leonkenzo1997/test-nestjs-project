import { IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  password: string;
}
