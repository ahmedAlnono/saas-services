import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { FindeUserDto } from 'src/user/dto/find-user.dto';
import { Request } from 'express';
import { Public } from 'src/user/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() user: CreateUserDto) {
    return this.authService.signup(user);
  }

  @Public()
  @Post('login')
  async signIn(@Body() signInDto: FindeUserDto) {
    return this.authService.signin(signInDto);
  }

  @Get('profile')
  profile(@Req() req: Request) {
    return req['user'];
  }
}
