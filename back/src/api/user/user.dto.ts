import { IsEmail, isNotEmpty, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

function toLowerCase(value: string): string {
  return value.toLowerCase();
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @Transform(({ value }) => toLowerCase(value))
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

}

export class SigninQueryDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}