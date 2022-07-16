import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto, SigninQueryDto } from './user.dto';
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

type signType = {
  email: string;
  password: string;
}

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Inject(TodoService)
  private readonly todo_service: TodoService;

   @Get('signin')
  public checkUser(@Query() query: SigninQueryDto): Promise<User | void> {
    return this.service.checkUser(query.email, query.password);
  }

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    console.log("ID = " + id);
    return this.service.getUser(id);
  }

  @Get('getUserTodos/:id')
  public getTodos(@Param('id', ParseIntPipe) id: number): Promise<User> {
    console.log("ID = " + id);
    return this.service.getTodos(id);
  }
  

  // @Get('signin/:email/:password')
  // public checkUser(@Param('email') email: string, @Param('password') password: string): Promise<User | void> {
  //   console.log("Email = " + email);
  //   console.log("Password = " + password);
  //   return this.service.checkUser(email, password);
  // }

 

  

  @Post('create')
  public createUser(@Body() body: CreateUserDto): Promise<User> {
    console.log(body);
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