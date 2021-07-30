import { Alergy } from 'src/alergies/entities/alergy.entity';
import { UsersDetail } from 'src/users-details/entities/users-detail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users_detail_alergies_alergy', synchronize: false })
export class UsersDetailAlergiesAlergy {
  @PrimaryColumn()
  public usersDetailId: number;
  @PrimaryColumn()
  public alergyId: number;
}
