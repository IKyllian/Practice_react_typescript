import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { CreateTodoDto } from '../todo/todo.dto';
import { User } from './user.entity';
import { Todo } from '../todo/todo.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getUser(id: number): Promise<User> {
    return this.repository.findOneBy({id: id});
  }

  // public clearUsers(): void {
  //   this.repository.clear();
  //   console.log("Clear");
  // }

  public getTodos(id: number): Promise<Todo[]> {
    return this.repository.findOneBy({id: id}).then((user: User) => (user.todos));
  }

  public createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.name = body.name;
    user.email = body.email;
    user.todos = [];

    return this.repository.save(user);
  }

  public async addTodo(id: number, body: CreateTodoDto): Promise<Todo> {
    const todo: Todo = new Todo();

    todo.content = body.content;
    todo.isActive = body.isActive;
    todo.isComplete = body.isComplete;

    return await this.repository.findOneBy({id: id}).then((user: User) => {
      // Check si la todo existe déjà
        return user.todos[user.todos.push(todo) - 1];
    })
  }
}