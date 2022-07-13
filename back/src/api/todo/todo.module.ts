import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { Todo } from './todo.entity';
import { User } from '../user/user.entity';
import { TodoService } from './todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), TypeOrmModule.forFeature([User])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}