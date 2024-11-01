import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/models/user.model';
import { FindeUserDto } from 'src/user/dto/find-user.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private user;
    private jwt;
    private configService;
    constructor(user: typeof User, jwt: JwtService, configService: ConfigService);
    signin(user: FindeUserDto): Promise<{
        access_token: string;
    }>;
    signup(user: CreateUserDto): Promise<void>;
    signToken(userId: number, email: string, password: string): Promise<{
        access_token: string;
    }>;
}
