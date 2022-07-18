import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto, SigninQueryDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ProjectService } from '../project/project.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Inject(ProjectService)
  private readonly project_service: ProjectService;

  @Get('signin')
  public async signin(@Query() query: SigninQueryDto): Promise<User> {
    return await this.service.signin(query.email, query.password);
  }

  @Get(':id')
  public async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    console.log("ID = " + id);
    return await this.service.getUser(id);
  }

  @Get('getUserProjects/:id')
  public async getProjects(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.service.getUserProjects(id);
  }

  // @Get('signin/:email/:password')
  // public checkUser(@Param('email') email: string, @Param('password') password: string): Promise<User | void> {
  //   return this.service.signin(email, password);
  // }

  @Post('create')
  public async createUser(@Body() body: CreateUserDto): Promise<User> {
    console.log(body);
    return await this.service.createUser(body);
  }
}