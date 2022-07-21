import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

type idType = {
  projectId: number,
}

@Controller('todo')
export class TodoController {
  @Inject(TodoService)
  private readonly service: TodoService;

  @Get()
  public async getTodos(): Promise<Todo[]> {
    return await this.service.getTodos();
  }

  @Get('getTodosByProjectId/:id')
  public async getTodosByProjectId( @Param('id', ParseIntPipe) projectId: number): Promise<Todo[]> {
    return await this.service.getTodosByProjectId(projectId);
  }

  @Post('updateActiveStatus/:id')
  public async updateActiveStatus(@Body() body: {status: boolean}, @Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.service.updateActiveStatus(body.status, id);
  }

  @Post('updateCompleteStatus/:id')
  public async updateCompleteStatus(@Body() body: {status: boolean}, @Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.service.updateCompleteState(body.status, id);
  }

  @Delete('deleteTodo/:id')
  public async deleteTodo(@Body() body: idType, @Param('id', ParseIntPipe) id: number): Promise<Todo[]> {
    return await this.service.deleteTodo(body.projectId, id);
  }

  @Delete('deleteCompletedTodo/:id')
  public async deleteCompletedTodo(@Param('id', ParseIntPipe) id: number): Promise<Todo[]> {
    return await this.service.deleteCompletedTodo(id);
  }
}