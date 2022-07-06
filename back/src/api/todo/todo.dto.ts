import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  public content: string;

  public isActive: boolean;
  public isComplete: boolean;
}