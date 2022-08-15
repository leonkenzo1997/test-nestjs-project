import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  public id: number = null;

  @IsNotEmpty()
  @IsString()
  public name: string;
}
