import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateProjectDto } from './project.dto';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  @Inject(ProjectService)
  private readonly service: ProjectService;

}