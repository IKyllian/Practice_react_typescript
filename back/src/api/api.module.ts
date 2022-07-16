import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [UserModule, TodoModule, ProjectModule]
})
export class ApiModule {}
