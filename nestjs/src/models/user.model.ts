import {
  Model,
  Table,
  Column,
  DataType,
  IsEmail,
  Unique,
  BeforeCreate,
  HasMany,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Notification } from './notification.model';

@Table({
  paranoid: true,
  underscored: true,
  timestamps: true,
})
export class User extends Model {
  @Column
  name: string;

  @Unique
  @IsEmail
  @Column
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hash: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isServiceProvider: boolean;

  @HasMany(() => Notification)
  notifications: number[];

  @BeforeCreate
  static async hashPassword(user: User) {
    user.hash = await bcrypt.hash(user.hash, 10);
  }
}
