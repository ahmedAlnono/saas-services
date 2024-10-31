import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ModelsProviders } from './user.provider';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, ...ModelsProviders],
})
export class UserModule {}
