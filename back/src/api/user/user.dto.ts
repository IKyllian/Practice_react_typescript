import { IsEmail, isNotEmpty, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Todo } from '../todo/todo.entity';

function toLowerCase(value: string): string {
  return value.toLowerCase();
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @Transform(({ value }) => toLowerCase(value))
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  public todo: Todo[];
}

export class SigninQueryDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}