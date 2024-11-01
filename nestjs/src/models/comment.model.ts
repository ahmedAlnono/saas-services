import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Project } from './project.model';

@Table({
  paranoid: true,
  underscored: true,
  timestamps: true,
})
export class Comment extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: User;

  @ForeignKey(() => Project)
  projectId: Project;

  @Column
  photos: string;

  @Column({
    type: DataType.BOOLEAN,
    field: 'has_reply',
  })
  hasReply: boolean;

  @Column({
    allowNull: false,
    defaultValue: 0,
  })
  views: number;
}
