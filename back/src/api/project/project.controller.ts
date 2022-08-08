import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateProjectDto, CreateInviteDto } from './project.dto';
import { CreateTodoDto } from '../todo/todo.dto';
import { Invites, Project } from './project.entity';
import { ProjectService } from './project.service';
import { TodoService } from '../todo/todo.service';
import { Todo } from '../todo/todo.entity';

type posType = {
  srcPos: number,
  destPos: number,
}

@Controller('project')
export class ProjectController {
  @Inject(ProjectService)
  private readonly service: ProjectService;

  @Inject(TodoService)
  private readonly todo_service: TodoService;

  @Get('allProjects')
  public async getAllProjects(): Promise<Project[]> {
    return await this.service.getAllProjects();
  }

  @Get('getTodos/:id')
  public async getTodos(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return await this.service.getTodos(id);
  }

  @Post('create')
  public async createProject(@Body() body: CreateProjectDto): Promise<Project> {
    return await this.service.createProject(body);
  }

  @Post('addTodo/:id')
  public async addTodo(@Body() body: CreateTodoDto, @Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return await this.service.addTodo(body, id, this.todo_service);
  }

  @Post('switchTodosPos/:id')
  public async switchPos(@Body() body: posType, @Param('id', ParseIntPipe) userId: number): Promise<Todo[]> {
    return await this.service.switchPos(body.srcPos, body.destPos, userId, this.todo_service);
  }

  @Post('createInvite')
  public async createInvite(@Body() body: CreateInviteDto): Promise<Invites> {
    return await this.service.createInvite(body);
  }
}