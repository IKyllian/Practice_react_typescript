import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { ProjectController } from '../project/project.controller';
import { User } from './user.entity';
import { Project } from '../project/project.entity';
import { UserService } from './user.service';
import { ProjectService } from '../project/project.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Project])],
  controllers: [UserController, ProjectController],
  providers: [UserService, ProjectService],
})
export class UserModule {}