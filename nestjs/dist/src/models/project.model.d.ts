import { Model } from 'sequelize-typescript';
import { User } from './user.model';
import { Comment } from './comment.model';
export declare class Project extends Model {
    name: string;
    description: string;
    projectLink: string;
    isCompleter: boolean;
    maker_photos: string[];
    status: string[];
    owner_photos: string[];
    maker: number;
    deadLine: Date;
    owner: User;
    commnets: Comment[];
}
