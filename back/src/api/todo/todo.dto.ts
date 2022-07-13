import { IsBoolean, isBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  isActive: boolean;
  
  @IsNumber()
  public pos: number;

  @IsBoolean()
  isComplete: boolean;
}