import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './project.dto';
import { Project } from './project.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ProjectService {
  @InjectRepository(Project)
  private readonly repository: Repository<Project>;


}
