import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { userJwtPayload } from './dto/user-jwt-paylaod.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getNotification(user: userJwtPayload): Promise<import("../models/notification.model").Notification[]>;
    findOne(id: string): Promise<import("../models/user.model").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}
