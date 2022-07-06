import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateTodoDto } from './todo.dto';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  @Inject(TodoService)
  private readonly service: TodoService;

//   @Get()
//   public getTodos(): Promise<Todo[]> {
//     return this.service.getTodos();
//   }

//   @Post()
//   public createTodo(@Body() body: CreateTodoDto): Promise<Todo> {
//     return this.service.createTodo(body);
//   }
}