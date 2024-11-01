import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { FindeUserDto } from 'src/user/dto/find-user.dto';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(user: CreateUserDto): Promise<void>;
    signIn(signInDto: FindeUserDto): Promise<{
        access_token: string;
    }>;
    profile(req: Request): any;
}
