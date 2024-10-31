import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { databaseProviders } from 'src/db/database.provider';
import { ModelsProviders } from 'src/user/user.provider';

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [ProjectService, ...databaseProviders, ...ModelsProviders],
})
export class ProjectModule {}
