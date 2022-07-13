import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { CreateTodoDto } from '../todo/todo.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { TodoService } from '../todo/todo.service';
import { Todo } from '../todo/todo.entity';

type idType = {
  clientId: number,
}

type posType = {
  srcPos: number,
  destPos: number,
}

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Inject(TodoService)
  private readonly todo_service: TodoService;

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getUser(id);
  }

  @Get('getUserTodos/:id')
  public getTodos(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getTodos(id);
  }

  @Post('create')
  public createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.service.createUser(body);
  }

  @Put('addTodo/:id')
  public addTodo(@Body() body: CreateTodoDto, @Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.service.addTodo(id, body, this.todo_service);
  }

  @Post('switchPos/:id')
  public switchPos(@Body() body: posType, @Param('id', ParseIntPipe) userId: number): Promise<User> {
    return this.service.switchPos(body.srcPos, body.destPos, userId, this.todo_service);
  }
}