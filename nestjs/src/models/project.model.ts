import {
  Model,
  Table,
  Column,
  ForeignKey,
  HasMany,
  DataType,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Comment } from './comment.model';

@Table({
  paranoid: true,
  underscored: true,
  timestamps: true,
})
export class Project extends Model {
  @Column
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    allowNull: true,
  })
  projectLink: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  isCompleter: boolean;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  maker_photos: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
    defaultValue: ['request project'],
  })
  status: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  owner_photos: string[];

  @Column
  @ForeignKey(() => User)
  maker: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deadLine: Date;

  @ForeignKey(() => User)
  owner: number;

  @HasMany(() => Comment)
  commnets: number[];
}
