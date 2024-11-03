import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { databaseProviders } from 'src/db/database.provider';
import { ModelsProviders } from 'src/user/user.provider';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './src/files/uploads',
    }),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ...databaseProviders, ...ModelsProviders],
})
export class ProjectModule {}
