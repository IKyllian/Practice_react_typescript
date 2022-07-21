import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './project.dto';
import { CreateTodoDto } from '../todo/todo.dto';
import { TodoService } from '../todo/todo.service';
import { Project } from './project.entity';
import { User } from '../user/user.entity';
import { Todo } from '../todo/todo.entity';

@Injectable()
export class ProjectService {
  @InjectRepository(Project)
  private readonly repository: Repository<Project>;
  @InjectRepository(User)
  private readonly user_repository: Repository<User>;

  public async getAllProjects(): Promise<Project[]> {
    return await this.repository.find({relations: ["users", "todos"]});
  }

  public async getTodos(projectId: number): Promise<Project> {
    return await this.repository.findOne({where: {id: projectId}, relations: ["todos"], order: {todos: {pos: "ASC"}}});
  }

  public async createProject(body: CreateProjectDto): Promise<Project> {
    const user = await this.user_repository.findOneBy({id: body.userId});
    if (user) {
      const project: Project = new Project();
    
      project.name = body.name;
      project.todos = [];
      project.users = [user];
      project.invites = [];
  
      return await this.repository.save(project);
    } else
      return Promise.reject("User does not exist");    
  }

  public async addTodo(body: CreateTodoDto, projectId: number, todo_service: TodoService): Promise<Todo> {
    const project = await this.repository.findOne({where: {id: projectId}, relations: ["todos"] });
    if (project) {
      return await todo_service.createTodo(body, project, project.todos.length);
    } else
      return Promise.reject("Project does not exist");
  }

  public async switchPos(srcPos: number, destPost: number, projectId: number, todo_service: TodoService): Promise<Todo[]> {
    const project = await this.repository.findOneBy({ id: projectId });
    if (project) {
      return await todo_service.switchPos(srcPos, destPost, projectId);
    } else
      return Promise.reject("Poject does not exist");
  }
}
