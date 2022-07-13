import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './todo.dto';
import { Todo } from './todo.entity';
import { User } from '../user/user.entity';

@Injectable()
export class TodoService {
  @InjectRepository(Todo)
  private readonly repository: Repository<Todo>;

  public reorderAfterDelete(id: number, pos: number): void {
    this.repository.find({relations: ['user'], where: {user: {id: id}}}).then((todos: Todo[]) => {
        if (todos.length > 0) {
          todos.forEach((elem: Todo) => {
              if (elem.pos > pos) {
                this.repository.findOneBy({id: elem.id}).then((todo: Todo) => {
                  todo.pos -= 1;
                  this.repository.save(todo);
                })
              }
          })
        }
    })
  }

  public async updateActiveStatus(id: number): Promise<Todo> {
    const todo = await this.repository.findOneBy({id: id});
    
    todo.isActive = !todo.isActive;
    return this.repository.save(todo);
  }

  public async updateCompleteState(id: number): Promise<Todo> {
    const todo = await this.repository.findOneBy({id: id});
    
    todo.isComplete = !todo.isComplete;
    return this.repository.save(todo);
  }

  public createTodo(body: CreateTodoDto, user: User, pos: number): Promise<Todo> {
    const todo: Todo = new Todo();
    
    todo.content = body.content;
    todo.isActive = body.isActive;
    todo.isComplete = body.isComplete;
    todo.pos = pos;
    todo.user = user;

    return this.repository.save(todo);
  }

  public deleteTodo(clientId: number, todoId: number): boolean {
    this.repository.findOneBy({id: todoId}).then((elem: Todo) => {
      if (elem != null) {
        this.repository.delete({id: elem.id});
        this.reorderAfterDelete(clientId, elem.pos);
      } 
    })
    return (true);
  }

  public deleteCompletedTodo(id: number): boolean {
    this.repository.find({relations: ['user'], where: {user: {id: id}, isComplete: true}}).then((todos: Todo[]) => {
      todos.forEach((elem: Todo) =>  {
        let pos: number = elem.pos;
        this.repository.delete({pos: elem.pos});
        this.reorderAfterDelete(id, pos);
      })
      return true;
    })
    return (true);
  }

  public switchPos(srcPos: number, destPos: number, userId: number): boolean {
    this.repository.find({relations: ['user'], where: {user: {id: userId}}}).then((todos: Todo[]) => {
      if (todos.length > 1) {
        todos.forEach((elem: Todo) => {
            if (srcPos > destPos && elem.pos >= destPos && elem.pos < srcPos) {
              this.repository.findOneBy({id: elem.id}).then(async (todo: Todo) => {
                todo.pos += 1;
               console.log(await this.repository.save(todo));
              })
            }
            else if (srcPos < destPos && elem.pos <= destPos && elem.pos > srcPos) {
              this.repository.findOneBy({id: elem.id}).then(async (todo: Todo) => {
                todo.pos -= 1;
               console.log(await this.repository.save(todo));
              })
            }
        })
        this.repository.findOneBy({pos: srcPos}).then(async (todo: Todo) => {
          if (todo == null || todo == undefined)
            return false;
          todo.pos = destPos;
         console.log(await this.repository.save(todo));
        })
      }
    })
    return (true);
  }
}