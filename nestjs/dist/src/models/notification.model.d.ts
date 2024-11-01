import { Model } from 'sequelize-typescript';
import { User } from './user.model';
import { ServiceProvider } from './server-provider.model';
export declare class Notification extends Model {
    message: string;
    userId: User;
    providerId: ServiceProvider;
}
