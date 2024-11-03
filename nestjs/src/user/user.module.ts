import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ModelsProviders } from './user.provider';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './src/user/photos',
    }),
  ],
  controllers: [UserController],
  providers: [UserService, ...ModelsProviders],
})
export class UserModule {}
