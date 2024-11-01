import { Model } from 'sequelize-typescript';
import { Comment } from './comment.model';
export declare class User extends Model {
    name: string;
    email: string;
    hash: string;
    comments: Comment[];
    static hashPassword(user: User): Promise<void>;
}
