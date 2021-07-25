import { Min } from 'class-validator';
import User from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UsersDetail {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => User)
  @JoinColumn()
  public userId: User;

  @Column()
  @Min(0)
  public age: number;

  @Column()
  @Min(0)
  public weight: number;

  @Column()
  public pregnantOrBreastFeed: boolean;

  @Column('text', { array: true })
  public alergies: string[];
}
