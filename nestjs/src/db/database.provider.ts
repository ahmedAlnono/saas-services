import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Comment } from 'src/models/comment.model';
import { Notification } from 'src/models/notification.model';
import { Project } from 'src/models/project.model';
import { ServiceProvider } from 'src/models/server-provider.model';
import { User } from 'src/models/user.model';

export const databaseProviders = [
  {
    inject: [ConfigService],
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
      });
      sequelize.addModels([
        User,
        Comment,
        Project,
        Notification,
        ServiceProvider,
      ]);
      return sequelize;
    },
  },
];
