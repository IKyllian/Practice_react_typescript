import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto, SigninQueryDto } from './user.dto';
import { CreateProjectDto } from '../project/project.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/project.entity';

type posType = {
  srcPos: number,
  destPos: number,
}

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Inject(ProjectService)
  private readonly project_service: ProjectService;

   @Get('signin')
  public checkUser(@Query() query: SigninQueryDto): Promise<User | void> {
    return this.service.checkUser(query.email, query.password);
  }

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    console.log("ID = " + id);
    return this.service.getUser(id);
  }

  // @Get('getUserProjects/:id')
  // public getProjects(@Param('id', ParseIntPipe) id: number): Promise<User> {
  //   console.log("ID = " + id);
  //   return this.service.getProjects(id);
  // }

  // @Get('signin/:email/:password')
  // public checkUser(@Param('email') email: string, @Param('password') password: string): Promise<User | void> {
  //   console.log("Email = " + email);
  //   console.log("Password = " + password);
  //   return this.service.checkUser(email, password);
  // }

  @Post('create')
  public createUser(@Body() body: CreateUserDto): Promise<User> {
    console.log(body);
    return this.service.createUser(body);
  }

  // @Put('addProject/:id')
  // public addProject(@Body() body: CreateProjectDto, @Param('id', ParseIntPipe) id: number): Promise<Project> {
  //   return this.service.addProject(id, body, this.project_service);
  // }

  // @Post('switchPos/:id')
  // public switchPos(@Body() body: posType, @Param('id', ParseIntPipe) userId: number): Promise<User> {
  //   return this.service.switchPos(body.srcPos, body.destPos, userId, this.project_service);
  // }
}