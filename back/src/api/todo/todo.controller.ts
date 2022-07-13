import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateTodoDto } from './todo.dto';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

type idType = {
  clientId: number,
}

@Controller('todo')
export class TodoController {
  @Inject(TodoService)
  private readonly service: TodoService;

  @Post('updateActiveStatus/:id')
  public updateActiveStatus(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.service.updateActiveStatus(id);
  }

  @Post('updateCompleteStatus/:id')
  public updateCompleteStatus(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.service.updateCompleteState(id);
  }

  @Delete('deleteTodo/:id')
  public deleteTodo(@Body() body: idType, @Param('id', ParseIntPipe) id: number): boolean {
    return this.service.deleteTodo(body.clientId, id);
  }

  @Delete('deleteCompletedTodo/:id')
  public deleteCompletedTodo(@Param('id', ParseIntPipe) id: number): boolean {
    return this.service.deleteCompletedTodo(id);
  }

//   @Get()
//   public getTodos(): Promise<Todo[]> {
//     return this.service.getTodos();
//   }

//   @Post()
//   public createTodo(@Body() body: CreateTodoDto): Promise<Todo> {
//     return this.service.createTodo(body);
//   }
}