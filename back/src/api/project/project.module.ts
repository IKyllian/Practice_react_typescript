import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { Project, Invites } from './project.entity';
import { User } from '../user/user.entity';
import { Todo } from '../todo/todo.entity';
import { ProjectService } from './project.service';
import { TodoService } from '../todo/todo.service';
import { TodoController } from '../todo/todo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Invites, User, Todo])],
  controllers: [ProjectController, TodoController],
  providers: [ProjectService, TodoService],
})
export class ProjectModule {}
