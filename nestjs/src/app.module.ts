import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './db/database.module';
import { APP_GUARD } from '@nestjs/core';
import { GlobalAuthGuard } from './auth/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { FilesModule } from './files/files.module';
import { ServiceProviderModule } from './service-provider/service-provider.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule.register('development'),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ProjectModule,
    FilesModule,
    ServiceProviderModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GlobalAuthGuard,
    },
  ],
})
export class AppModule {}
