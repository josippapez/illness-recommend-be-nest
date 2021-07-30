import { UsersDetail } from 'src/users-details/entities/users-detail.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Alergy {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToMany(() => UsersDetail, (detail) => detail.id)
  userDetailsIds: UsersDetail[];
}
