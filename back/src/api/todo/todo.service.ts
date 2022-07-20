import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './todo.dto';
import { Todo } from './todo.entity';
import { Project } from '../project/project.entity';

@Injectable()
export class TodoService {
  @InjectRepository(Todo)
  private readonly repository: Repository<Todo>;

  public async getTodos(): Promise<Todo[]> {
    return await this.repository.find();
  }

  public async reorderAfterDelete(projectId: number, pos: number): Promise<Todo> {
    return this.repository.find({relations: ['project'] , where: {project: {id: projectId}}}).then((todos: Todo[]) => {
        if (todos.length > 0) {
          todos.forEach(async(elem: Todo) => {
              if (elem.pos > pos) {
                await this.repository.findOneBy({id: elem.id}).then(async (todo: Todo) => {
                  todo.pos -= 1;
                  return await this.repository.save(todo);
                })
              }
          })
        } else
          return Promise.reject("No Projects");
    })
  }

  public async updateActiveStatus(status: boolean, id: number): Promise<any> {
    return await this.repository.update(id, {isActive: status});
  }

  public async updateCompleteState(status: boolean, id: number): Promise<any> {
    return await this.repository.update(id, {isComplete: status});
  }

  public async createTodo(body: CreateTodoDto, project: Project, pos: number): Promise<Todo> {
    const todo: Todo = new Todo();
    
    todo.content = body.content;
    todo.isActive = body.isActive;
    todo.isComplete = false;
    todo.pos = pos;
    todo.project = project;

    return await this.repository.save(todo);
  }

  public async deleteTodo(projectId: number, todoId: number): Promise<Todo[]> {
    return await this.repository.findOneBy({id: todoId}).then(async (elem: Todo) => {
      if (elem != null) {
        await this.repository.delete({id: elem.id});
        await this.reorderAfterDelete(projectId, elem.pos);
        return this.repository.find({relations: ['project'], where: {project: {id: projectId}}})
      } else
        return Promise.reject("Project does not exist");
    }).catch((err) => { return Promise.reject("Project does not exist"); });
  }

  public async deleteCompletedTodo(projectId: number): Promise<Todo[]> {
    return await this.repository.find({relations: ['project'], where: {project: {id: projectId}, isComplete: true}}).then(async (todos: Todo[]) => {
      for (const todo of todos) {
        await this.deleteTodo(projectId, todo.id);
      }
      return await this.repository.find({relations: ['project'], where: {project: {id: projectId}}});
    }).catch((err: any) => { return Promise.reject("Project does not exist") });
  }

  public async switchPos(srcPos: number, destPos: number, projectId: number): Promise<Todo[]> {
    return await this.repository.find({relations: ['project'], where: {project: {id: projectId}}}).then(async (todos: Todo[]) => {
      if (todos.length > 1) {
        todos.forEach(async (elem: Todo) => {
            if (srcPos > destPos && elem.pos >= destPos && elem.pos < srcPos) {
              await this.repository.findOneBy({id: elem.id}).then(async (todo: Todo) => {
                todo.pos += 1;
                await this.repository.save(todo);
              })
            }
            else if (srcPos < destPos && elem.pos <= destPos && elem.pos > srcPos) {
              await this.repository.findOneBy({id: elem.id}).then(async (todo: Todo) => {
                todo.pos -= 1;
                await this.repository.save(todo);
              })
            }
        })
        await this.repository.findOneBy({pos: srcPos}).then(async (todo: Todo) => {
          if (todo == null || todo == undefined)
            return false;
          todo.pos = destPos;
          await this.repository.save(todo);
        })
        return await this.repository.find({relations: ['project'], where: {project: {id: projectId}}});
      }
    }).catch((err: any) => { return Promise.reject("Project does not exist")});
  }
}