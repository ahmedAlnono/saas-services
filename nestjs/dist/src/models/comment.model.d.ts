import { Model } from 'sequelize-typescript';
import { User } from './user.model';
import { Project } from './project.model';
export declare class Comment extends Model {
    title: string;
    description: string;
    userId: User;
    projectId: Project;
    photos: string;
    hasReply: boolean;
    views: number;
}
