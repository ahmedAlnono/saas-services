import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
  StreamableFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from './public.decorator';
import { UserIdentity } from './user-identity.decorator';
import { userJwtPayload } from './dto/user-jwt-paylaod.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import path, { join } from 'path';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserData(@UserIdentity() user: userJwtPayload) {
    if (user) {
      try {
        const userData = await this.userService.getUser(user.sub);
        return {
          id: user.sub,
          name: userData.name,
          photo: userData.photo,
          email: user.email,
        };
      } catch (e) {
        return 'error';
      }
    } else {
      return 'wrong token';
    }
  }

  @Get('notification')
  getNotification(@UserIdentity() user: userJwtPayload) {
    return this.userService.findNotification(user);
  }

  @Public()
  @Post('photo/:id')
  @UseInterceptors(FileInterceptor('photo'))
  addUserPhotos(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image' }),
        ],
      }),
    )
    photo: Express.Multer.File,
    @Param('id') id: number,
  ) {
    return this.userService.addUserPhoto(photo, id);
  }

  @Public()
  @Get('photo/:id')
  getUserPhoto(@Param('id') id: number) {
    const photo = createReadStream(
      join(process.cwd(), 'src/user/photos/' + id),
    );
    return new StreamableFile(photo);
  }

  @Patch(':id')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @UserIdentity() jwt: userJwtPayload,
  ) {
    return this.userService.update(updateUserDto, jwt);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
