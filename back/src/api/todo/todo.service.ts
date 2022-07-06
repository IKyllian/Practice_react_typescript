import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  @InjectRepository(Todo)
  private readonly repository: Repository<Todo>;

//   public getTodos(): Promise<Todo[]> {
//     return this.repository.;
//   }

//   public createTodo(body: CreateTodoDto): Promise<Todo> {
//     const user: Todo = new Todo();
    
//     user.content = body.content;
//     user.isActive = body.isActive;
//     user.isComplete = body.isComplete;

//     return this.repository.save(user);
//   }
}