import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  userId: number;
}

export class CreateInviteDto {
  @IsNumber()
  projectId: number;

  @IsNumber()
  senderId: number;

  @IsString()
  @IsNotEmpty()
  receiver: string;
}