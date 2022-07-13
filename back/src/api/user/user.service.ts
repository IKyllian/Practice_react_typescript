import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { CreateTodoDto } from '../todo/todo.dto';
import { User } from './user.entity';
import { Todo } from '../todo/todo.entity';
import { TodoService } from '../todo/todo.service'

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getUser(id: number): Promise<User> {
    return this.repository.findOneBy({id: id});
  }

  public getTodos(id: number): Promise<User> {
	  return this.repository.findOne({where: {id: id}, relations: ["todos"] });
  }

  public switchPos(srcPos: number, destPost: number, userId: number, todo_service: TodoService): Promise<User> {
    todo_service.switchPos(srcPos, destPost, userId);
    return this.repository.findOne({where: {id: userId}, relations: ["todos"] });
  }

  public createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.name = body.name;
    user.email = body.email;
    user.todos = [];

    return this.repository.save(user);
  }

  public async addTodo(id: number, body: CreateTodoDto, todo_service: TodoService): Promise<Todo> {
    return await this.repository.findOneBy({id: id}).then(async(user: User) => {
      return todo_service.createTodo(body, user, await this.repository.findOne({where: {id: id}, relations: ["todos"] }).then((user) =>  {return user.todos.length}));
    }).catch((err: any): Promise<any> => {
      console.log(err);
      return (err);
    })
  }
}