import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { Project } from './project.entity';
import { User } from '../user/user.entity';
import { Todo } from '../todo/todo.entity';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, Todo])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
