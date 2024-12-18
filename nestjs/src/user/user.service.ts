import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { NOTIFICATION_MODEL, USER_MODEL } from 'constants/constants';
import { User } from 'src/models/user.model';
import { Notification } from 'src/models/notification.model';
import { userJwtPayload } from './dto/user-jwt-paylaod.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL)
    private user: typeof User,
    @Inject(NOTIFICATION_MODEL)
    private notification: typeof Notification,
  ) {}

  async getUser(id: number) {
    return await this.user.findByPk(id, {
      attributes: ['name', 'photo'],
    });
  }

  async update(updateUserDto: UpdateUserDto, jwt: userJwtPayload) {
    try {
      const user = await this.user.findByPk(jwt.sub);
      if (user.hash == jwt.password) {
        await user.update({
          name: updateUserDto.name,
          email: updateUserDto.email,
        });
        return true;
      } else {
        return false;
      }
    } catch (e) {
      throw new BadGatewayException('user not found');
    }
  }

  async remove(id: number) {
    try {
      await this.user.destroy({
        where: {
          id,
        },
      });
      return true;
    } catch (e) {
      throw new BadGatewayException('user not found');
    }
  }

  async findNotification(user: userJwtPayload) {
    const notifications = await this.notification.findAll({
      where: {
        userId: user.sub,
      },
    });
    return notifications;
  }

  async addUserPhoto(file: Express.Multer.File, id: number) {
    await this.user.update(
      {
        photo: file.filename,
      },
      {
        where: {
          id,
        },
      },
    );
  }
}
