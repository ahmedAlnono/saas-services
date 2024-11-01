import { Model } from 'sequelize-typescript';
import { Project } from './project.model';
export declare class ServiceProvider extends Model {
    name: string;
    email: string;
    hash: string;
    accessKey: string;
    isActive: boolean;
    stack: string[];
    workOn: Project;
    static hashPassword(serviceProvider: ServiceProvider): Promise<void>;
}
