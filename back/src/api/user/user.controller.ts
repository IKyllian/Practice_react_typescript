import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { CreateTodoDto } from '../todo/todo.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Todo } from '../todo/todo.entity';


@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getUser(id);
  }

  @Get(':id')
  public getTodos(@Param('id', ParseIntPipe) id: number): Promise<Todo[]> {
    return this.service.getTodos(id);
  }

  @Post()
  public createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.service.createUser(body);
  }

  // @Post('clear')
  // public clearUsers(): void {
  //   this.service.clearUsers();
  // }

  @Post(':id')
  public addTodo(@Param('id', ParseIntPipe) id: number, @Body() body: CreateTodoDto): Promise<Todo> {
    return this.service.addTodo(id, body);
  }
}