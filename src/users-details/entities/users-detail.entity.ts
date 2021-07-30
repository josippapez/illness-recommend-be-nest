import { Min } from 'class-validator';
import { Alergy } from 'src/alergies/entities/alergy.entity';
import User from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class UsersDetail {
  @PrimaryColumn({ nullable: false })
  public id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'id' })
  public userId: number;

  @Column()
  @Min(0)
  public age: number;

  @Column()
  @Min(0)
  public weight: number;

  @Column()
  public pregnantOrBreastFeed: boolean;

  @ManyToMany(() => Alergy, (alergy) => alergy.id)
  @JoinTable({
    name: 'users_detail_alergies_alergy',
    joinColumn: {
      name: 'usersDetailId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'alergyId',
      referencedColumnName: 'id',
    },
  })
  public alergies: Alergy[];
}
