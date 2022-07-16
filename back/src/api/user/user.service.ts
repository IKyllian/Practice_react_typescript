import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { CreateTodoDto } from '../todo/todo.dto';
import { User } from './user.entity';
import { Todo } from '../todo/todo.entity';
import { TodoService } from '../todo/todo.service'
import * as bcrypt from 'bcrypt';

const saltRounds = 15;

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getUser(id: number): Promise<User> {
    return this.repository.findOne({where: {id: id}, relations: ["todos"] });
  }

  public checkUser(email: string, password: string): Promise<User | void> {
    return this.repository.findOneBy({email: email}).then(async (user: User) => {
      const match = await bcrypt.compare(password, user.password);
      if (match)
        console.log("User is Log");
      else
        console.log("Password doesn't match");
      return user;
    })
    .catch((err) => console.log(err));
  } 

  public getTodos(id: number): Promise<User> {
	  return this.repository.findOne({where: {id: id}, relations: ["todos"] });
  }

  public switchPos(srcPos: number, destPost: number, userId: number, todo_service: TodoService): Promise<User> {
    todo_service.switchPos(srcPos, destPost, userId);
    return this.repository.findOne({where: {id: userId}, relations: ["todos"] });
  }

  public async createUser(body: CreateUserDto): Promise<User> {
    const password = body.password;
    const user: User = new User();

    user.name = body.name;
    user.email = body.email;
    // console.log("TEST");
    // console.log(password);
    const hash = await bcrypt.hash(password, saltRounds);
    user.password = hash;
    // bcrypt.hash(password, saltRounds, function(err, hash) {
    //   // console.log("TEST2");
    //   // console.log(hash);
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     user.password = hash;
    //   }
    //   // Store hash in your password DB.
    // });
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