import { IsBoolean, isBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProjectDto {
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