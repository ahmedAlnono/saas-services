import {
  NOTIFICATION_MODEL,
  PROJECT_MODEL,
  USER_MODEL,
} from 'constants/constants';
import { User } from '../models/user.model';
import { Notification } from 'src/models/notification.model';
import { Project } from 'src/models/project.model';
import { ValueProvider } from '@nestjs/common';

export const ModelsProviders: ValueProvider[] = [
  {
    provide: USER_MODEL,
    useValue: User,
  },
  {
    provide: NOTIFICATION_MODEL,
    useValue: Notification,
  },
  {
    provide: PROJECT_MODEL,
    useValue: Project,
  },
];
