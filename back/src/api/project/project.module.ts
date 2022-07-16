import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { Project } from './project.entity';
import { User } from '../user/user.entity';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), TypeOrmModule.forFeature([User])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
