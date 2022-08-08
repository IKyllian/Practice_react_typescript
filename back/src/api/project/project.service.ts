import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto, CreateInviteDto } from './project.dto';
import { CreateTodoDto } from '../todo/todo.dto';
import { TodoService } from '../todo/todo.service';
import { Invites, Project } from './project.entity';
import { User } from '../user/user.entity';
import { Todo } from '../todo/todo.entity';
import { reverse } from 'dns';

@Injectable()
export class ProjectService {
  @InjectRepository(Project)
  private readonly repository: Repository<Project>;
  @InjectRepository(User)
  private readonly user_repository: Repository<User>;
  // @InjectRepository(Invites)
  // private readonly invite_repository: Repository<Invites>;

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

  public async createInvite(body: CreateInviteDto): Promise<Invites> {
  //   const project = await this.repository.findOneBy({id: body.projectId});
  //   const sender = await this.user_repository.findOneBy({id: body.senderId});
  //   const receiver = await this.user_repository.findOneBy({username: body.receiver});
  //   if (project && sender) {
  //     if (receiver) {
  //       const invite: Invites = new Invites();

  //       invite.project = project;
  //       invite.sender = sender;
  //       invite.receiver = receiver;

  //       return await this.invite_repository.save(invite);
  //     } else
  //       return Promise.reject("No receiver");
  //   } else
  //     return Promise.reject("No project or sender");

      return Promise.reject("No project or sender");
  }
}