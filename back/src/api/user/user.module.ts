import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { TodoController } from '../todo/todo.controller';
import { User } from './user.entity';
import { Todo } from '../todo/todo.entity';
import { UserService } from './user.service';
import { TodoService } from '../todo/todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Todo])],
  controllers: [UserController, TodoController],
  providers: [UserService, TodoService],
})
export class UserModule {}