import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Todo } from '../todo/todo.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  public email: string;

  public todo: Todo[];
}