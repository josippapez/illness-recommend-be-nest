import { Min } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Alergy } from '../../alergies/entities/alergy.entity';
import User from '../../users/entities/user.entity';

@Entity()
export class PatientDetail {
  @PrimaryGeneratedColumn()
  public id?: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  public userId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public created: string;

  @Column()
  public oib: string;

  @Column()
  public name: string;

  @Column()
  @Min(0)
  public age: number;

  @Column()
  @Min(0)
  public weight: number;

  @Column()
  public pregnantOrBreastFeed: boolean;

  @Column('json', { nullable: true, default: [] })
  public symptomsSelected: JSON[];

  @Column('json', { nullable: true, default: [] })
  public medicationsSelected: JSON[];

  @ManyToMany(() => Alergy, (alergy) => alergy.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'patient_detail_alergies_alergy',
    joinColumn: {
      name: 'patientDetailId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'alergyId',
      referencedColumnName: 'id',
    },
  })
  public alergies: Alergy[];
}
