import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/models/user.model';
import { FindeUserDto } from 'src/user/dto/find-user.dto';
import * as bcrypt from 'bcrypt';
import { USER_MODEL } from 'constants/constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_MODEL)
    private user: typeof User,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}
  async signin(user: FindeUserDto) {
    try {
      const findeUser = await this.user.findOne({
        where: {
          email: user.email,
        },
        attributes: ['email', 'hash', 'id'],
      });
      if (findeUser) {
        const isMatch = await bcrypt.compare(user.password, findeUser.hash);
        if (isMatch) {
          return this.signToken(findeUser.id, findeUser.email, findeUser.hash);
        } else {
          throw new ForbiddenException('wrong password');
        }
      } else {
        throw new ForbiddenException('user not found');
      }
    } catch (e) {
      throw new BadRequestException('wrong user data');
    }
  }
  async signup(user: CreateUserDto) {
    try {
      await this.user
        .create({
          name: user.name,
          email: user.email,
          hash: user.password,
        })
        .then((user: User) => {
          return this.signToken(user.id, user.email, user.hash);
        });
    } catch (e) {
      throw new ForbiddenException('wrong user data');
    }
  }
  async signToken(userId: number, email: string, password: string) {
    const payload = {
      sub: userId,
      email,
      password,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30d',
      secret: this.configService.get<string>('AUTH_SECRET'),
    });
    return {
      access_token: token,
    };
  }
  // async validateUser(sub: number, password: string): Promise<any> {
  //   const user = await this.user.findOne({
  //     where: {
  //       id: sub,
  //     },
  //   });
  //   if (user && (await bcrypt.compare(user.hash, password))) {
  //     return user;
  //   }
  //   return false;
  // }
}
