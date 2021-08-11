import { Min } from 'class-validator';
import { Alergy } from 'src/alergies/entities/alergy.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PatientDetail {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public oib: number;

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

  @Column('text', { array: true, nullable: true, default: [] })
  public symptomsSelected: string[];

  @Column('json', { nullable: true, default: [] })
  public medicationsSelected: JSON[];

  @ManyToMany(() => Alergy, (alergy) => alergy.id, {
    eager: false,
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
