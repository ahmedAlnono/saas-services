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
import { Comment } from './comment.model';

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
    type: DataType.TEXT,
    allowNull: true,
  })
  photo: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hash: string;

  @HasMany(() => Comment)
  comments: Comment[];

  @BeforeCreate
  static async hashPassword(user: User) {
    user.hash = await bcrypt.hash(user.hash, 10);
  }
}
