import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/models/user.model';
import { Notification } from 'src/models/notification.model';
import { userJwtPayload } from './dto/user-jwt-paylaod.dto';
export declare class UserService {
    private user;
    private notification;
    constructor(user: typeof User, notification: typeof Notification);
    findAllServiceProvider(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<boolean>;
    remove(id: number): Promise<boolean>;
    findNotification(user: userJwtPayload): Promise<Notification[]>;
}
