import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { User } from './user.model';
import { ServiceProvider } from './server-provider.model';

@Table({
  paranoid: true,
  underscored: true,
  timestamps: true,
})
export class Notification extends Model {
  @Column({
    type: DataType.STRING,
  })
  message: string;

  @ForeignKey(() => User)
  userId: User;

  @ForeignKey(() => ServiceProvider)
  providerId: ServiceProvider;
}
