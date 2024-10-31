import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ModelsProviders } from 'src/user/user.provider';

@Module({
  imports: [
    MulterModule.register({
      dest: './src/files/uploads',
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService, ...ModelsProviders],
})
export class FilesModule {}
