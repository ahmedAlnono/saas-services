import {
  Model,
  Table,
  Column,
  DataType,
  IsEmail,
  Unique,
  BeforeCreate,
  ForeignKey,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Project } from './project.model';

@Table({
  paranoid: true,
  underscored: true,
  timestamps: true,
})
export class ServiceProvider extends Model {
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
    type: DataType.TEXT,
    allowNull: false,
  })
  photo: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  accessKey: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isActive: boolean;

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: false,
  })
  stack: string[];
  @Column({
    allowNull: true,
    type: DataType.NUMBER,
  })
  @ForeignKey(() => Project)
  workOn: Project;

  @BeforeCreate
  static async hashPassword(serviceProvider: ServiceProvider) {
    serviceProvider.hash = await bcrypt.hash(serviceProvider.hash, 10);
  }
}
